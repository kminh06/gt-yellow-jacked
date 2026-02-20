import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function WorkoutLink(props: { id: string }) {
  return (
    <Button>
      <Link href={`/workout?id=${props.id}`}>Workout (id: {props.id})</Link>
    </Button>
  )
}
