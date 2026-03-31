import { create } from "zustand"
import { WorkoutExercise, WorkoutSet } from "../types/workout.types"
import { Exercise } from "@/types"

let _setCounter = 0
function newSetId() {
  return `set-${++_setCounter}-${Date.now()}`
}
function makeDefaultSet(): WorkoutSet {
  return { id: newSetId(), reps: 0, weight: 0, completed: false }
}

interface WorkoutState {
  workoutName: string
  startedAt: Date | null
  exercises: WorkoutExercise[]

  setWorkoutName: (name: string) => void
  resetWorkout: () => void  
  addExercise: (exercise: Exercise) => void
  removeExercise: (instanceId: string) => void
  updateNotes: (instanceId: string, notes: string) => void
  addSet: (instanceId: string) => void
  removeSet: (instanceId: string, setId: string) => void
  updateSet: (instanceId: string, setId: string, field: 'reps' | 'weight', value: number | '') => void
  toggleSetComplete: (instanceId: string, setId: string) => void
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  workoutName: '',
  startedAt: null,
  exercises: [],

  setWorkoutName: (name) => set({workoutName: name}),

  startWorkout: () => set((state) => ({startedAt: state.startedAt ?? new Date()})),

  resetWorkout: () => set({workoutName: '', startedAt: null, exercises: []}),

  addExercise: (exercise) => set((state) => ({startedAt: state.startedAt ?? new Date(),
    exercises: [...state.exercises, {
      instanceId: `${exercise.id}-${Date.now()}-${Math.random()}`,
      exercise,
      sets: [makeDefaultSet()],
      notes: '',
    }],
  })),

  removeExercise: instanceId => set((state) => ({
    exercises: state.exercises.filter((ex)=> ex.instanceId !== instanceId), 
  })),

  updateNotes: (instanceId, notes) => set((state) => ({
    exercises: state.exercises.map((ex) =>
      ex.instanceId === instanceId ? { ...ex, notes } : ex
    ),
  })),

  addSet: (instanceId) => set((state) => ({
    exercises: state.exercises.map((ex) =>
      ex.instanceId === instanceId ? { ...ex, sets: [...ex.sets, makeDefaultSet()] } : ex
    ),
  })),

  removeSet: (instanceId, setId) => set((state) => ({
    exercises: state.exercises.map((ex) => {
      if (ex.instanceId !== instanceId) return ex
      if (ex.sets.length <= 1) return ex
      return { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
    }),
  })),

  updateSet: (instanceId, setId, field, value) => set((state) => ({
    exercises: state.exercises.map((ex) => {
      if (ex.instanceId != instanceId) return ex
      return { ...ex, sets: ex.sets.map((s) => s.id === setId ? { ...s, [field]: value } : s) }
    }),
  })),
  toggleSetComplete: (instanceId, setId) => set((state) => ({
    exercises: state.exercises.map((ex) => {
      if (ex.instanceId !== instanceId) return ex
      return { ...ex, sets: ex.sets.map((s) => s.id === setId ? { ...s, completed: !s.completed } : s) }
    }),
  })),
}))