'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import { auth } from '@/lib/db/firebase-config'
import { Skeleton } from '@/components/ui/skeleton'

const PUBLIC_ROUTES = new Set(['/login', '/signup'])

export const AuthContext = createContext<{
  user: User | null
  loading: boolean
  isAuthenticated: boolean
} | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (loading) return

    if (!user && !PUBLIC_ROUTES.has(pathname)) {
      router.replace('/login')
    }

    if (user && PUBLIC_ROUTES.has(pathname)) {
      router.replace('/')
    }
  }, [user, loading, pathname, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {loading ? <Skeleton></Skeleton> : children}
    </AuthContext.Provider>
  )
}
