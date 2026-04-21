'use client'
import { useState, useMemo } from 'react'
import { Plus, Search, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { MOCK_EXERCISES } from '@/lib/db/mock-data'
import { useWorkoutStore } from '@/features/workouts/hooks/useWorkoutStore'
import { Exercise } from '@/types'
import { cn } from '@/lib/utils'

export function AddExercisesButton() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const workoutExercises = useWorkoutStore((s) => s.exercises)
  const addExercise = useWorkoutStore((s) => s.addExercise)

  const selectedExerciseIds = useMemo(
    () =>
      new Set(
        workoutExercises.map((workoutExercise) => workoutExercise.exercise.id),
      ),
    [workoutExercises],
  )

  const filtered = useMemo(
    () =>
      MOCK_EXERCISES.filter(
        (ex) =>
          ex.name.toLowerCase().includes(query.toLowerCase()) ||
          ex.muscleGroups.some((m) =>
            m.toLowerCase().includes(query.toLowerCase()),
          ),
      ),
    [query],
  )

  const handleAdd = (exercise: Exercise) => {
    if (selectedExerciseIds.has(exercise.id)) {
      return
    }

    addExercise(exercise)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Exercises
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-md p-0 gap-0'>
        <DialogHeader className='px-4 pt-4 pb-2'>
          <DialogTitle>Add Exercise</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className='px-4 pb-2'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search by name or muscle…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='pl-9'
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className='no-scrollbar max-h-[55vh] overflow-y-auto px-4 pb-4 space-y-1'>
          {filtered.length === 0 && (
            <p className='text-center text-sm text-muted-foreground py-8'>
              No exercises found.
            </p>
          )}

          {filtered.map((exercise) => {
            const isAlreadyAdded = selectedExerciseIds.has(exercise.id)

            return (
              <div
                key={exercise.id}
                className='flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-muted transition-colors'
              >
                <div className='min-w-0'>
                  <p className='text-sm font-medium truncate'>
                    {exercise.name}
                  </p>
                  <div className='flex gap-1 flex-wrap mt-0.5'>
                    {exercise.muscleGroups.map((m) => (
                      <span
                        key={m}
                        className='text-xs text-muted-foreground capitalize'
                      >
                        {m}
                      </span>
                    ))}
                    <span className='text-xs text-muted-foreground'>
                      · {exercise.equipment}
                    </span>
                  </div>
                </div>

                <Button
                  size='sm'
                  variant={isAlreadyAdded ? 'default' : 'outline'}
                  className={cn(
                    'shrink-0 h-8 w-8 p-0',
                    isAlreadyAdded && 'bg-primary',
                  )}
                  onClick={() => handleAdd(exercise)}
                  disabled={isAlreadyAdded}
                >
                  {isAlreadyAdded ? (
                    <Check className='h-4 w-4' />
                  ) : (
                    <Plus className='h-4 w-4' />
                  )}
                </Button>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
