/**
 * This ensures everyone uses the EXACT same spelling for muscles. Modify as needed based on external exercise libraries.
 * Owned by: Exercise Library Lead
 */
export type MuscleGroup =
  | 'abs'
  | 'biceps'
  | 'calves'
  | 'chest'
  | 'glutes'
  | 'hamstrings'
  | 'lats'
  | 'quads'
  | 'shoulders'
  | 'traps'
  | 'triceps'

/**
 * The individual exercise unit. Modify as needed based on external exercise libraries.
 * Owned by: Exercise Library Lead
 */
export interface Exercise {
  id: string
  name: string
  muscleGroups: MuscleGroup[]
  equipment: string
  instructions?: string[]
  imgUrl?: string // For the search list
  gifUrl?: string // For the search list
}

export interface Workout {
  id: string
  userId: string
  title: string
  description?: string
  exercises: Exercise[]
  createdAt: number
}

/**
 * place filler for syntax check
 * Owned by: auth
 */
export interface User {
  id: string
  email: string
  provider: 'password' | 'google'
}
