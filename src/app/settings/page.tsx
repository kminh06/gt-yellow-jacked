'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth'

export default function SettingsPage() {
  const router = useRouter()
  const { user, signOutUser } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState('')

  const handleLogout = async () => {
    setLoggingOut(true)
    setError('')

    try {
      await signOutUser()
      router.replace('/login')
    } catch {
      setError('Unable to log out right now. Please try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <main className='min-h-screen bg-background px-4 pb-24 pt-4'>
      <section className='mx-auto w-full max-w-md space-y-4'>
        <header className='space-y-1'>
          <h1 className='text-2xl font-bold text-foreground'>Settings</h1>
          <p className='text-sm text-muted-foreground'>
            Manage your account and session.
          </p>
        </header>

        <div className='rounded-xl border border-border bg-card p-4'>
          <p className='text-xs uppercase tracking-wide text-muted-foreground'>
            Signed in as
          </p>
          <p className='mt-1 text-sm font-medium text-foreground'>
            {user?.email ?? 'No email available'}
          </p>
        </div>

        {error ? <p className='text-sm text-destructive'>{error}</p> : null}

        <Button
          variant='destructive'
          className='w-full'
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? 'Logging out...' : 'Log out'}
        </Button>
      </section>
    </main>
  )
}
