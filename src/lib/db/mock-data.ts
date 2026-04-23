import { Exercise, Workout } from '@/types'

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
  {
    id: 'e4',
    name: 'Overhead Press',
    muscleGroups: ['shoulders', 'triceps'],
    equipment: 'Barbell',
  },
  {
    id: 'e5',
    name: 'Barbell Row',
    muscleGroups: ['lats', 'traps', 'biceps'],
    equipment: 'Barbell',
  },
  {
    id: 'e6',
    name: 'Romanian Deadlift',
    muscleGroups: ['hamstrings', 'glutes', 'traps'],
    equipment: 'Barbell',
  },
  {
    id: 'e7',
    name: 'Incline Dumbbell Press',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    equipment: 'Dumbbells',
  },
  {
    id: 'e8',
    name: 'Lat Pulldown',
    muscleGroups: ['lats', 'biceps'],
    equipment: 'Cable',
  },
  {
    id: 'e9',
    name: 'Seated Cable Row',
    muscleGroups: ['lats', 'traps', 'biceps'],
    equipment: 'Cable',
  },
  {
    id: 'e10',
    name: 'Deadlift',
    muscleGroups: ['glutes', 'hamstrings', 'traps', 'lats'],
    equipment: 'Barbell',
  },
  {
    id: 'e11',
    name: 'Bulgarian Split Squat',
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    equipment: 'Dumbbells',
  },
  {
    id: 'e12',
    name: 'Walking Lunges',
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    equipment: 'Dumbbells',
  },
  {
    id: 'e13',
    name: 'Leg Press',
    muscleGroups: ['quads', 'glutes'],
    equipment: 'Machine',
  },
  {
    id: 'e14',
    name: 'Leg Curl',
    muscleGroups: ['hamstrings'],
    equipment: 'Machine',
  },
  {
    id: 'e15',
    name: 'Leg Extension',
    muscleGroups: ['quads'],
    equipment: 'Machine',
  },
  {
    id: 'e16',
    name: 'Lateral Raise',
    muscleGroups: ['shoulders'],
    equipment: 'Dumbbells',
  },
  {
    id: 'e17',
    name: 'Face Pull',
    muscleGroups: ['shoulders', 'traps'],
    equipment: 'Cable',
  },
  {
    id: 'e18',
    name: 'Bicep Curl',
    muscleGroups: ['biceps'],
    equipment: 'Dumbbells',
  },
  {
    id: 'e19',
    name: 'Tricep Pushdown',
    muscleGroups: ['triceps'],
    equipment: 'Cable',
  },
  {
    id: 'e20',
    name: 'Hanging Leg Raise',
    muscleGroups: ['abs', 'quads'],
    equipment: 'Bodyweight',
  },
  {
    id: 'e21',
    name: 'Plank',
    muscleGroups: ['abs', 'shoulders'],
    equipment: 'Bodyweight',
  },
  {
    id: 'e22',
    name: 'Calf Raise',
    muscleGroups: ['calves'],
    equipment: 'Machine',
  },
  {
    id: 'e23',
    name: 'Chest Fly',
    muscleGroups: ['chest'],
    equipment: 'Cable',
  },
  {
    id: 'e24',
    name: 'Push Ups',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'Bodyweight',
  },
]

export const MOCK_WORKOUT_1: Workout = {
  id: 'w1',
  userId: 'user123',
  title: 'Georgia Tech Heavy Day',
  exercises: [
    MOCK_EXERCISES[0],
    MOCK_EXERCISES[2],
    MOCK_EXERCISES[4],
    MOCK_EXERCISES[5],
    MOCK_EXERCISES[3],
  ],
  createdAt: Date.now(),
}

export const MOCK_WORKOUT_2: Workout = {
  id: 'w2',
  userId: 'user123',
  title: 'Georgia Tech Light Day',
  exercises: [
    MOCK_EXERCISES[23],
    MOCK_EXERCISES[7],
    MOCK_EXERCISES[10],
    MOCK_EXERCISES[15],
    MOCK_EXERCISES[21],
  ],
  createdAt: Date.now(),
}
