import { WorkoutLink } from '@/features/dashboard'
import { Workout } from '@/types'
import { MOCK_WORKOUT_1, MOCK_WORKOUT_2 } from '@/lib/db/mock-data'

const workouts: Workout[] = [MOCK_WORKOUT_1, MOCK_WORKOUT_2]

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen items-start bg-background font-sans p-4'>
      <div className='text-4xl font-bold text-primary text-left w-full'>
        Hi [Name] 👋
      </div>
      <div className='text-3xl font-bold text-primary text-left w-full'>
        My Workouts
      </div>

      {/* All workouts will be displayed here */}
      <div className='border w-full gap-2 flex flex-col'>
        All workouts will be displayed here
        {workouts.map((workout) => (
          <WorkoutLink key={workout.id} id={workout.id} />
        ))}
      </div>
    </div>
  )
}
