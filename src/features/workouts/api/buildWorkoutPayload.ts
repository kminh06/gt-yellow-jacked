import { WorkoutExercise } from "../types/workout.types";

export interface WorkoutPayload {
  workoutName: string
  exercises: WorkoutExercise[]
  startedAt: string | null
}

export function buildWorkoutPayload (
  workoutName: string,
  startedAt: Date | null,
  exercises: WorkoutExercise[]
): WorkoutPayload{
  return {
    workoutName,
    startedAt: startedAt ? startedAt.toISOString() : null,
    exercises,
  }
}