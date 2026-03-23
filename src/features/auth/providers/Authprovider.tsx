'use client'

import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { createContext, type ReactNode, useEffect, useState } from 'react'

import { auth } from '@/lib/db/firebase-config'

type AuthContextValue = {
  user: FirebaseUser | null
  loading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
