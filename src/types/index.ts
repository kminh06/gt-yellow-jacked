/**
 * This ensures everyone uses the EXACT same spelling for muscles. Modify as needed based on external exercise libraries.
 * Owned by: Exercise Library Lead
 */
export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'quads'
  | 'hamstrings'
  | 'biceps'
  | 'triceps'
  | 'shoulders'
  | 'abs'

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

/**
 * The Workout container.
 * Owned by: Workout Builder Lead
 */
export interface Workout {
  id: string
  userId: string
  title: string
  description?: string
  exercises: Exercise[]
  createdAt: number
}
