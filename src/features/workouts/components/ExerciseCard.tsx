'use client'

import { useState } from 'react'
import { Trash2, Plus, StickyNote, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useWorkoutStore } from '@/features/workouts/hooks/useWorkoutStore'
import { WorkoutExercise } from '../types/workout.types'

interface ExerciseCardProps {
  workoutExercise: WorkoutExercise
  index: number
}

export function ExerciseCard({ workoutExercise, index }: ExerciseCardProps) {
  const { instanceId, exercise, sets, notes } = workoutExercise
  const [notesOpen, setNotesOpen] = useState(false)

  const addSet          = useWorkoutStore((s) => s.addSet)
  const removeSet       = useWorkoutStore((s) => s.removeSet)
  const updateSet       = useWorkoutStore((s) => s.updateSet)
  const toggleSetComplete = useWorkoutStore((s) => s.toggleSetComplete)
  const removeExercise  = useWorkoutStore((s) => s.removeExercise)
  const updateNotes     = useWorkoutStore((s) => s.updateNotes)

  const completedCount = sets.filter((s) => s.completed).length

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground w-5">{index + 1}</span>
            <h3 className="font-semibold text-sm">{exercise.name}</h3>
          </div>
          <div className="flex gap-1 mt-1 ml-7 flex-wrap">
            {exercise.muscleGroups.map((m) => (
              <span
                key={m}
                className="text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize"
              >
                {m}
              </span>
            ))}
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {exercise.equipment}
            </span>
          </div>
        </div>

        <div className="flex gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setNotesOpen((o) => !o)}
          >
            {notesOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <StickyNote className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => removeExercise(instanceId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notes */}
      {notesOpen && (
        <Textarea
          placeholder="Notes, cues, modifications…"
          value={notes}
          onChange={(e) => updateNotes(instanceId, e.target.value)}
          className="text-sm resize-none h-16"
        />
      )}

      {/* Set Table */}
      <div className="space-y-1">
        <div className="grid grid-cols-[2rem_1fr_1fr_2rem_1.5rem] gap-2 px-1">
          <span className="text-xs text-muted-foreground text-center">Set</span>
          <span className="text-xs text-muted-foreground text-center">kg</span>
          <span className="text-xs text-muted-foreground text-center">Reps</span>
          <span className="text-xs text-muted-foreground text-center">✓</span>
          <span />
        </div>

        {sets.map((set, i) => (
          <div
            key={set.id}
            className={cn(
              'grid grid-cols-[2rem_1fr_1fr_2rem_1.5rem] gap-2 items-center px-1 rounded-lg transition-colors',
              set.completed && 'bg-primary/10'
            )}
          >
            <span className="text-xs text-center text-muted-foreground font-mono">
              {i + 1}
            </span>

            <Input
              type="number"
              placeholder="—"
              min={0}
              value={set.weight}
              onChange={(e) =>
                updateSet(
                  instanceId,
                  set.id,
                  'weight',
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
              className="h-8 text-center text-sm px-1"
            />

            <Input
              type="number"
              placeholder="—"
              min={0}
              value={set.reps}
              onChange={(e) =>
                updateSet(
                  instanceId,
                  set.id,
                  'reps',
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
              className="h-8 text-center text-sm px-1"
            />

            <button
              onClick={() => toggleSetComplete(instanceId, set.id)}
              className={cn(
                'h-7 w-7 rounded-full border-2 text-xs font-bold transition-all flex items-center justify-center',
                set.completed
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/30 text-transparent'
              )}
            >
              ✓
            </button>

            <button
              onClick={() => removeSet(instanceId, set.id)}
              disabled={sets.length === 1}
              className="text-muted-foreground/40 hover:text-destructive disabled:opacity-20 text-sm leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1"
          onClick={() => addSet(instanceId)}
        >
          <Plus className="h-3 w-3" /> Add Set
        </Button>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{sets.length} sets done
        </span>
      </div>
    </div>
  )
}
