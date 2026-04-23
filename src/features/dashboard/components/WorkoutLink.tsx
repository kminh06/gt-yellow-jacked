import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Workout } from '@/types'

interface WorkoutLinkProps {
  workout: Workout
}

export function WorkoutLink({ workout }: WorkoutLinkProps) {
  const uniqueExercises = Array.from(
    new Map(
      workout.exercises.map((exercise) => [exercise.id, exercise]),
    ).values(),
  )
  const exerciseCount = uniqueExercises.length
  const listedExerciseNames = uniqueExercises.map((exercise) => exercise.name)
  const exercisePreview =
    listedExerciseNames.length > 2
      ? `${listedExerciseNames.slice(0, 2).join(', ')} +${listedExerciseNames.length - 2}`
      : listedExerciseNames.join(', ')
  const muscleGroups = Array.from(
    new Set(uniqueExercises.flatMap((exercise) => exercise.muscleGroups)),
  )

  return (
    <Link
      href={`/workout?id=${workout.id}`}
      className='block w-full rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/40'
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <p className='truncate text-base font-semibold text-foreground'>
            {workout.title}
          </p>
          <p className='mt-1 text-xs text-muted-foreground'>
            {exerciseCount} exercise{exerciseCount === 1 ? '' : 's'}
          </p>
          <p className='mt-1 truncate text-xs text-muted-foreground'>
            {exercisePreview}
          </p>
        </div>
        <ChevronRight className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
      </div>

      {muscleGroups.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {muscleGroups.slice(0, 4).map((muscle) => (
            <span
              key={muscle}
              className='rounded-full bg-muted px-2 py-1 text-[11px] capitalize text-muted-foreground'
            >
              {muscle}
            </span>
          ))}
          {muscleGroups.length > 4 && (
            <span className='rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground'>
              +{muscleGroups.length - 4}
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
