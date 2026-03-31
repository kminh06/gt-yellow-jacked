'use client'

import { useAuth } from '@/features/auth/hooks/use-auth'
import {
  useWorkoutStore,
} from '@/features/workouts/hooks/useWorkoutStore'
import { ExerciseCard } from './ExerciseCard'
import { AddExercisesButton } from './AddExercisesButton'
import { buildWorkoutPayload } from '../api/buildWorkoutPayload'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dumbbell } from 'lucide-react'

export function WorkoutBuilder() {
  const { user } = useAuth()
  const exercises     = useWorkoutStore((s) => s.exercises)
  console.log('exercises:', exercises)
  const workoutName   = useWorkoutStore((s) => s.workoutName)
  const resetWorkout = useWorkoutStore((s) => s.resetWorkout)
  const startedAt     = useWorkoutStore((s) => s.startedAt)
  const setWorkoutName = useWorkoutStore((s) => s.setWorkoutName)
  const save = async () => {
   const state = useWorkoutStore.getState()
   console.log('Save workout:', state)
  }
  const status = 'idle'
  const error = null

  const totalSets = exercises.reduce((n, e) => n + e.sets.length, 0)
  const doneSets  = exercises.reduce(
    (n, e) => n + e.sets.filter((s) => s.completed).length,
    0
  )
  const progress = totalSets > 0 ? doneSets / totalSets : 0

  const handleSave = async () => {
    if (!user || exercises.length === 0) return
    const payload = buildWorkoutPayload(user.uid, workoutName, startedAt, exercises)
    await save()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3 space-y-2">
        <Input
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="text-base font-semibold border-none shadow-none px-0 h-auto focus-visible:ring-0 bg-transparent"
          placeholder="Workout name…"
        />

        {/* Progress bar */}
        {totalSets > 0 && (
          <div className="space-y-0.5">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {doneSets}/{totalSets} sets completed
            </p>
          </div>
        )}
      </div>

      {/* Exercise List */}
      <div className="flex-1 px-4 py-4 space-y-3">
        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <Dumbbell className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No exercises yet.
              <br />
              Tap <strong>Add Exercises</strong> to get started.
            </p>
          </div>
        ) : (
          exercises.map((we, i) => (
            <ExerciseCard key={we.instanceId} workoutExercise={we} index={i} />
          ))
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-4 py-3">
        {error && (
          <p className="text-xs text-destructive mb-2 text-center">{error}</p>
        )}
        <div className="flex gap-2">
          <AddExercisesButton />

          <div className="flex gap-2 ml-auto">
            {exercises.length > 0 && (
              <Button
                variant="ghost"
                onClick={resetWorkout}
                disabled={status === 'saving'}
              >
                Discard
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={exercises.length === 0 || status === 'saving'}
            >
              {status === 'saving'
                ? 'Saving…'
                : status === 'success'
                ? '✓ Saved'
                : 'Save Workout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
