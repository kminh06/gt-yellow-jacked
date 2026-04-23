import { WorkoutLink } from '@/features/dashboard'
import { Workout } from '@/types'
import { MOCK_WORKOUT_1, MOCK_WORKOUT_2 } from '@/lib/db/mock-data'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Dumbbell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const workouts: Workout[] = [MOCK_WORKOUT_1, MOCK_WORKOUT_2]

export default function Home() {
  const totalExercises = new Set(
    workouts.flatMap((workout) =>
      workout.exercises.map((exercise) => exercise.id),
    ),
  ).size

  return (
    <main className='min-h-screen bg-background px-4 pb-24 pt-4'>
      <section className='mx-auto w-full max-w-md space-y-4'>
        <header className='space-y-2'>
          <p className='text-xs uppercase tracking-wide text-muted-foreground'>
            Yellow Jacked
          </p>
          <h1 className='text-3xl font-bold leading-tight text-foreground'>
            Ready to train today?
          </h1>
          <p className='text-sm text-muted-foreground'>
            {workouts.length} saved workouts • {totalExercises} unique exercises
          </p>
        </header>

        <section className='grid grid-cols-2 gap-2'>
          <Button asChild className='h-11 justify-between rounded-xl'>
            <Link href='/workout'>
              Start
              <ArrowRight className='size-4' />
            </Link>
          </Button>
          <Button
            asChild
            variant='outline'
            className='h-11 justify-between rounded-xl'
          >
            <Link href='/workout?new=1'>
              Add New
              <Plus className='size-4' />
            </Link>
          </Button>
        </section>

        <section className='rounded-xl border border-border bg-card p-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Dumbbell className='size-4 text-primary' />
              <span className='text-sm font-medium'>Weekly consistency</span>
            </div>
            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
              <CalendarDays className='size-3.5' />3 / 5 sessions
            </div>
          </div>
          <div className='mt-3 h-2 overflow-hidden rounded-full bg-muted'>
            <div className='h-full w-[60%] rounded-full bg-primary' />
          </div>
        </section>

        <section className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-foreground'>
              My Workouts
            </h2>
            <span className='text-xs text-muted-foreground'>Tap to open</span>
          </div>

          <div className='space-y-2'>
            {workouts.map((workout) => (
              <WorkoutLink key={workout.id} workout={workout} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
