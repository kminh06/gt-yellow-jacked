export interface WorkoutSet {
  id: string
  reps: number
  weight: number
  completed: boolean
}

export interface WorkoutExercise {
  instanceId: string
  exercise: Exercise
  name: string
  sets: WorkoutSet[]
}

export interface Workout {
  workoutName: string
  exercises: WorkoutExercise[]
  startedAt: Date | null
}