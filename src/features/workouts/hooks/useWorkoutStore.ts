import { create } from "zustand"
import { WorkoutExercise, WorkoutSet } from "../types/workout.types"

interface WorkoutState {
  workoutName: string
  startedAt: Date | null
  exercises: WorkoutExercise[]

  setWorkoutName: (name: string) => void
  startWorkout: () => void
  addExercise: (exercise: WorkoutExercise) => void
  removeExercise: (id: string) => void
  updateSet: (exerciseId: string, setIndex: number, updatedSet: WorkoutSet) => void
  resetWorkout: () => void  
}

const defaultSet: WorkoutSet = {reps: 0, weight: 0, completed: false}
export const useWorkoutStore = create<WorkoutState>((set) => ({
  workoutName: '',
  startedAt: null,
  exercises: [],

  setWorkoutName: (name) => set({workoutName: name}),

  startWorkout: () => set((state) => ({startedAt: state.startedAt ?? new Date()})),

  addExercise: (exercise) => 
    set((state) => ({ startedAt: state.startedAt ?? new Date(),
    exercises: [...state.exercises, {...exercise, sets: exercise.sets && exercise.sets.length > 0 ? exercise.sets.map((s) => ({ ...s, completed: s.completed ?? false })): [defaultSet],},],})),

  removeExercise: id => set((state) => ({
    exercises: state.exercises.filter((ex)=> ex.id !== id), 
  })),

  updateSet: (exerciseId, setIndex, updatedSet) => set((state) => ({
    exercises: state.exercises.map((ex) => {
      if (ex.id != exerciseId) return ex
      const newSets = [...ex.sets]
      newSets[setIndex] = updatedSet
      return {...ex, sets: newSets}
    }),
  })),

  resetWorkout: () => set({workoutName: '', startedAt: null, exercises: []}),

}))