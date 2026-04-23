'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth'

export default function LoginPage() {
  const router = useRouter()
  const {
    isAuthenticated,
    loading: authLoading,
    loginWithEmail,
    loginWithGoogle,
  } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    setLoading(true)
    setError('')

    try {
      await loginWithEmail(email, password, rememberMe)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setError('')

    try {
      await loginWithGoogle(rememberMe)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.')
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
              Sign in
            </h1>
            <p className='text-sm text-muted-foreground'>
              Use your email and password to continue.
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
                placeholder='Enter your password'
                autoComplete='current-password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error ? (
              <p className='text-sm text-destructive' role='alert'>
                {error}
              </p>
            ) : null}

            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center gap-2 text-muted-foreground'>
                <input
                  type='checkbox'
                  className='size-4 rounded border-input'
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Remember me
              </label>

              <Link
                href='/forgot-password'
                className='font-medium text-primary hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? (
                <>
                  <Spinner />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            <Button
              type='button'
              variant='outline'
              className='w-full'
              disabled={loading}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </form>

          <p className='mt-6 text-sm text-muted-foreground'>
            New here?{' '}
            <Link href='/signup' className='font-medium text-primary hover:underline'>
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
