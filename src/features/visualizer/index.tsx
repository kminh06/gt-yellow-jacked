'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Model, { type IExerciseData, type Muscle } from 'react-body-highlighter'
import { cn } from '@/lib/utils'
import { MuscleGroup } from '@/types'

export interface VisualizerProps {
  activeMuscles: MuscleGroup[]
  className?: string
}

type TooltipState = {
  label: string
  x: number
  y: number
  visible: boolean
}

type TooltipEvent = MouseEvent | TouchEvent

const MUSCLE_MAP: Record<MuscleGroup, Muscle[]> = {
  abs: ['abs'],
  biceps: ['biceps'],
  calves: ['calves', 'left-soleus', 'right-soleus'],
  chest: ['chest'],
  glutes: ['gluteal'],
  hamstrings: ['hamstring'],
  lats: ['upper-back'],
  quads: ['quadriceps'],
  shoulders: ['front-deltoids', 'back-deltoids'],
  traps: ['trapezius'],
  triceps: ['triceps'],
}

const MUSCLE_LABELS: Partial<Record<Muscle, string>> = {
  abs: 'Abs',
  biceps: 'Biceps',
  calves: 'Calves',
  chest: 'Chest',
  'front-deltoids': 'Front Deltoids',
  gluteal: 'Glutes',
  hamstring: 'Hamstrings',
  'left-soleus': 'Soleus',
  'right-soleus': 'Soleus',
  quadriceps: 'Quads',
  trapezius: 'Traps',
  triceps: 'Triceps',
  'upper-back': 'Lats',
}

function toMuscleLabel(muscle: Muscle) {
  return (
    MUSCLE_LABELS[muscle] ??
    muscle
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  )
}

function repeatMuscle(muscle: Muscle, count: number) {
  return Array.from({ length: count }, () => toMuscleLabel(muscle))
}

const ANTERIOR_POLYGON_LABELS = [
  ...repeatMuscle('chest', 2),
  ...repeatMuscle('obliques', 2),
  ...repeatMuscle('abs', 2),
  ...repeatMuscle('biceps', 2),
  ...repeatMuscle('triceps', 2),
  ...repeatMuscle('neck', 2),
  ...repeatMuscle('front-deltoids', 2),
  ...repeatMuscle('head', 1),
  ...repeatMuscle('abductors', 2),
  ...repeatMuscle('quadriceps', 6),
  ...repeatMuscle('knees', 2),
  ...repeatMuscle('calves', 4),
  ...repeatMuscle('forearm', 4),
]

const POSTERIOR_POLYGON_LABELS = [
  ...repeatMuscle('head', 1),
  ...repeatMuscle('trapezius', 2),
  ...repeatMuscle('back-deltoids', 2),
  ...repeatMuscle('upper-back', 2),
  ...repeatMuscle('triceps', 4),
  ...repeatMuscle('lower-back', 2),
  ...repeatMuscle('forearm', 4),
  ...repeatMuscle('gluteal', 2),
  ...repeatMuscle('adductor', 2),
  ...repeatMuscle('hamstring', 4),
  ...repeatMuscle('knees', 2),
  ...repeatMuscle('calves', 4),
  ...repeatMuscle('left-soleus', 1),
  ...repeatMuscle('right-soleus', 1),
]

export function Visualizer({ activeMuscles, className }: VisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const data = useMemo<IExerciseData[]>(
    () =>
      activeMuscles.map((muscle) => ({
        name: muscle,
        muscles: MUSCLE_MAP[muscle],
        frequency: 2,
      })),
    [activeMuscles],
  )
  const [tooltip, setTooltip] = useState<TooltipState>({
    label: '',
    x: 0,
    y: 0,
    visible: false,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const anteriorPolygons = Array.from(
      container.querySelectorAll('[data-view="front"] .rbh polygon'),
    )
    const posteriorPolygons = Array.from(
      container.querySelectorAll('[data-view="back"] .rbh polygon'),
    )

    anteriorPolygons.forEach((polygon, index) => {
      const label = ANTERIOR_POLYGON_LABELS[index]
      if (label) {
        polygon.setAttribute('data-muscle-label', label)
      }
    })

    posteriorPolygons.forEach((polygon, index) => {
      const label = POSTERIOR_POLYGON_LABELS[index]
      if (label) {
        polygon.setAttribute('data-muscle-label', label)
      }
    })

    const polygons = [...anteriorPolygons, ...posteriorPolygons]

    const getPointerPosition = (event: TooltipEvent) => {
      if (event instanceof TouchEvent && event.touches.length > 0) {
        return {
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY,
        }
      }

      if (event instanceof TouchEvent && event.changedTouches.length > 0) {
        return {
          clientX: event.changedTouches[0].clientX,
          clientY: event.changedTouches[0].clientY,
        }
      }

      if (event instanceof MouseEvent) {
        return {
          clientX: event.clientX,
          clientY: event.clientY,
        }
      }

      return null
    }

    const showTooltip = (event: TooltipEvent) => {
      const polygon = event.currentTarget as SVGPolygonElement | null
      const label = polygon?.getAttribute('data-muscle-label')
      const pointer = getPointerPosition(event)

      if (!container || !label || !pointer) {
        return
      }

      const bounds = container.getBoundingClientRect()
      setTooltip({
        label,
        x: pointer.clientX - bounds.left + 12,
        y: pointer.clientY - bounds.top - 12,
        visible: true,
      })
    }

    const hideTooltip = () => {
      setTooltip((current) => ({ ...current, visible: false }))
    }

    polygons.forEach((polygon) => {
      polygon.addEventListener('mouseenter', showTooltip as EventListener)
      polygon.addEventListener('mousemove', showTooltip as EventListener)
      polygon.addEventListener('mouseleave', hideTooltip)
      polygon.addEventListener('click', showTooltip as EventListener)
      polygon.addEventListener('touchstart', showTooltip as EventListener, {
        passive: true,
      })
    })

    return () => {
      polygons.forEach((polygon) => {
        polygon.removeEventListener('mouseenter', showTooltip as EventListener)
        polygon.removeEventListener('mousemove', showTooltip as EventListener)
        polygon.removeEventListener('mouseleave', hideTooltip)
        polygon.removeEventListener('click', showTooltip as EventListener)
        polygon.removeEventListener('touchstart', showTooltip as EventListener)
      })
    }
  }, [data])

  return (
    <section
      className={cn(
        'flex h-full min-h-0 items-center justify-center bg-background px-2 py-3 sm:px-4 sm:py-4',
        className,
      )}
    >
      <div
        ref={containerRef}
        className='relative grid w-full max-w-4xl grid-cols-2 justify-items-center gap-1 sm:gap-4'
      >
        <div data-view='front' className='flex min-w-0 w-full justify-center'>
          <Model
            data={data}
            type='anterior'
            bodyColor='#d7e1ea'
            highlightedColors={['#fb7185', '#e11d48']}
            style={{ width: '100%', maxWidth: '9rem' }}
            svgStyle={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </div>

        <div data-view='back' className='flex min-w-0 w-full justify-center'>
          <Model
            data={data}
            type='posterior'
            bodyColor='#d7e1ea'
            highlightedColors={['#fb7185', '#e11d48']}
            style={{ width: '100%', maxWidth: '9rem' }}
            svgStyle={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </div>

        <div
          className={cn(
            'pointer-events-none absolute z-10 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-900 shadow-md transition-opacity',
            tooltip.visible ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(0, -100%)',
          }}
        >
          {tooltip.label}
        </div>
      </div>

      <style jsx global>{`
        .rbh polygon {
          transition:
            opacity 120ms ease,
            filter 120ms ease;
        }

        .rbh polygon:hover {
          filter: brightness(0.96);
        }
      `}</style>
    </section>
  )
}
