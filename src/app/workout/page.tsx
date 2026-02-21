'use client'

import { AddExercisesButton } from '@/features/workouts'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function WorkoutContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <div className='flex flex-col min-h-screen bg-background p-4'>
      <h1 className='text-3xl font-bold font-heading'>Workout Details</h1>
      <p className='text-muted-foreground'>ID: {id}</p>
      <div className='flex flex-row gap-2'>
        {/* 3D Human Body Visualizer goes here */}
        <div className='border w-full flex-3'>
          3D Human Body Visualizer goes here
        </div>

        {/* Workout Exercises List Component goes here */}
        <div className='border w-full flex-2'>
          Workout Exercises List goes here <br></br>
          <br></br>use mock data from "@/lib/db/mock-data.ts" for now, but will
          eventually fetch from Firebase based on the workout ID in the URL
          query params
        </div>
      </div>
      {/* AddExercisesButton Component goes here */}
      <AddExercisesButton />
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
