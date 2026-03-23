'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth'

export default function SignupPage() {
  const router = useRouter()
  const {
    isAuthenticated,
    loading: authLoading,
    registerWithEmail,
    loginWithGoogle,
  } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/')
    }
  }, [authLoading, isAuthenticated, router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await registerWithEmail(email, password, rememberMe)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignup() {
    setLoading(true)
    setError('')

    try {
      await loginWithGoogle(rememberMe)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-background px-4'>
        <div className='flex items-center gap-3 text-sm text-muted-foreground'>
          <Spinner />
          Checking session...
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-background px-4 py-8'>
      <div className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center'>
        <section className='w-full rounded-lg border bg-card p-6 shadow-sm'>
          <div className='mb-6 space-y-2'>
            <h1 className='text-2xl font-semibold text-foreground'>
              Create account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Set up an email and password to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                autoComplete='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='Create a password'
                autoComplete='new-password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='Re-enter your password'
                autoComplete='new-password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <p className='text-xs text-muted-foreground'>
                Passwords must match and be at least 6 characters.
              </p>
            </div>

            {error ? (
              <p className='text-sm text-destructive' role='alert'>
                {error}
              </p>
            ) : null}

            <label className='flex items-center gap-2 text-sm text-muted-foreground'>
              <input
                type='checkbox'
                className='size-4 rounded border-input'
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Remember me
            </label>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? (
                <>
                  <Spinner />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>

            <Button
              type='button'
              variant='outline'
              className='w-full'
              disabled={loading}
              onClick={handleGoogleSignup}
            >
              Continue with Google
            </Button>
          </form>

          <p className='mt-6 text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link href='/login' className='font-medium text-primary hover:underline'>
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
