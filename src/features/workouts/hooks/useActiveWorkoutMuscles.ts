import { useMemo } from 'react'
import { useWorkoutStore } from './useWorkoutStore'
import { MuscleGroup } from '@/types'

export function useActiveWorkoutMuscles(): MuscleGroup[] {
  const exercises = useWorkoutStore((state) => state.exercises)

  return useMemo(() => {
    const muscleSet = new Set<MuscleGroup>()

    exercises.forEach((workoutExercise) => {
      workoutExercise.exercise.muscleGroups.forEach((muscle) => {
        muscleSet.add(muscle)
      })
    })

    return Array.from(muscleSet)
  }, [exercises])
}
