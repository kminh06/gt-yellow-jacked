export interface WorkoutSet {
  reps: number
  weight: number
  completed: boolean
}

export interface WorkoutExercise {
  id: string
  name: string
  sets: WorkoutSet[]
}

export interface Workout {
  workoutName: string
  exercises: WorkoutExercise[]
  startedAt: Date | null
}