import { Exercise } from "@/types"

export interface WorkoutSet {
  id: string
  reps: number
  weight: number
  completed: boolean
}

export interface WorkoutExercise {
  instanceId: string
  exercise: Exercise
  sets: WorkoutSet[]
  notes: string
}

export interface Workout {
  workoutName: string
  exercises: WorkoutExercise[]
  startedAt: Date | null
}