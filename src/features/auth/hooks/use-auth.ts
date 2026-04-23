'use client'

import { useCallback, useContext } from 'react'
import { AuthContext } from '@/features/auth/providers/Authprovider'
import {
  logout,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from '../api/auth-services'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const loginWithEmail = useCallback(
    async (email: string, password: string, rememberMe = true) => {
      return signInWithEmail(email, password, rememberMe)
    },
    []
  )

  const registerWithEmail = useCallback(
    async (email: string, password: string, rememberMe = true) => {
      return signUpWithEmail(email, password, rememberMe)
    },
    []
  )

  const loginWithGoogle = useCallback(async (rememberMe = true) => {
    return signInWithGoogle(rememberMe)
  }, [])

  const signOutUser = useCallback(async () => {
    await logout()
  }, [])

  return {
    ...context,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    signOutUser,
  }
}
