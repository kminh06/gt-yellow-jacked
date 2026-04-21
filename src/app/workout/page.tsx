'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { WorkoutBuilder } from '@/features/workouts/components/WorkoutBuilder'
import { useActiveWorkoutMuscles } from '@/features/workouts'
import { Visualizer } from '@/features/visualizer'

function WorkoutContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const activeMuscles = useActiveWorkoutMuscles()

  return (
    <div className='flex h-[calc(100dvh-env(safe-area-inset-top)-4rem-env(safe-area-inset-bottom))] flex-col overflow-hidden bg-background p-4'>
      <h1 className='text-3xl font-bold font-heading'>Workout Details</h1>
      <p className='text-muted-foreground'>ID: {id}</p>
      <div className='mt-3 grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-5'>
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
  return (
    // useSearchParams requires a Suspense boundary in static exports
    <Suspense fallback={<div>Loading...</div>}>
      <WorkoutContent />
    </Suspense>
  )
}
