import { Exercise, MuscleGroup, Workout } from '@/types'

export const MOCK_EXERCISES: Exercise[] = [
  {
    id: 'e1',
    name: 'Bench Press',
    muscleGroups: ['chest', 'triceps'],
    equipment: 'Barbell',
  },
  {
    id: 'e2',
    name: 'Pull Ups',
    muscleGroups: ['lats', 'biceps'],
    equipment: 'Bodyweight',
  },
  {
    id: 'e3',
    name: 'Squats',
    muscleGroups: ['glutes', 'quads', 'hamstrings'],
    equipment: 'Barbell',
  },
]

export const MOCK_WORKOUT_1: Workout = {
  id: 'w1',
  userId: 'user123',
  title: 'Georgia Tech Heavy Day',
  exercises: [MOCK_EXERCISES[0]],
  createdAt: Date.now(),
}

export const MOCK_WORKOUT_2: Workout = {
  id: 'w2',
  userId: 'user123',
  title: 'Georgia Tech Light Day',
  exercises: [MOCK_EXERCISES[0]],
  createdAt: Date.now(),
}
