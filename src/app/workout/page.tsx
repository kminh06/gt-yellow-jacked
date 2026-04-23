'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWorkoutStore } from '@/features/workouts/hooks/useWorkoutStore'
import { WorkoutBuilder } from '@/features/workouts/components/WorkoutBuilder'
import { useActiveWorkoutMuscles } from '@/features/workouts'
import { Visualizer } from '@/features/visualizer'
import { MOCK_WORKOUT_1, MOCK_WORKOUT_2 } from '@/lib/db/mock-data'

const MOCK_WORKOUTS = [MOCK_WORKOUT_1, MOCK_WORKOUT_2]

function WorkoutContent() {
  const searchParams = useSearchParams()
  const workoutId = searchParams.get('id')
  const isNewWorkout = searchParams.get('new') === '1'
  const activeMuscles = useActiveWorkoutMuscles()
  const hydrateFromWorkout = useWorkoutStore(
    (state) => state.hydrateFromWorkout,
  )
  const resetWorkout = useWorkoutStore((state) => state.resetWorkout)

  useEffect(() => {
    if (isNewWorkout) {
      resetWorkout()
      return
    }

    if (!workoutId) {
      return
    }

    const selectedWorkout = MOCK_WORKOUTS.find(
      (workout) => workout.id === workoutId,
    )

    if (selectedWorkout) {
      hydrateFromWorkout(selectedWorkout)
    }
  }, [isNewWorkout, workoutId, hydrateFromWorkout, resetWorkout])

  return (
    <div className='flex h-[calc(100dvh-env(safe-area-inset-top)-4rem-env(safe-area-inset-bottom))] flex-col overflow-hidden bg-background p-4'>
      <div className='mt-3 grid min-h-0 flex-1 grid-rows-[44svh_minmax(0,1fr)] gap-3 lg:grid-cols-5 lg:grid-rows-1'>
        {/* 3D Human Body Visualizer goes here */}
        <div className='min-h-0 w-full overflow-hidden rounded-md border lg:col-span-2'>
          <Visualizer activeMuscles={activeMuscles} />
        </div>

        {/* Workout Exercises List Component goes here */}
        <div className='min-h-0 w-full overflow-hidden rounded-md border lg:col-span-3'>
          <WorkoutBuilder />
        </div>
      </div>
    </div>
  )
}

export default function WorkoutPage() {
  return <WorkoutContent />
}
