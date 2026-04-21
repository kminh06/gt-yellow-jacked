import type React from 'react'
import { renderHook } from '@testing-library/react'

import { useAuth } from './use-auth'
import { AuthContext } from '@/features/auth/providers/Authprovider'
import * as authServices from '../api/auth-services'

vi.mock('@/lib/db/firebase-config', () => ({
  auth: {},
}))

vi.mock('../api/auth-services', async () => {
  const actual = await vi.importActual<typeof authServices>('../api/auth-services')

  return {
    ...actual,
    logout: vi.fn(),
    signInWithEmail: vi.fn(),
    signInWithGoogle: vi.fn(),
    signUpWithEmail: vi.fn(),
  }
})

describe('useAuth', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider
      value={{
        user: null,
        loading: false,
        isAuthenticated: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  )

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exposes auth state from context', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.loading).toBe(false)
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('delegates email login to the auth service', async () => {
    const signInSpy = vi.mocked(authServices.signInWithEmail)
    signInSpy.mockResolvedValue(undefined)

    const { result } = renderHook(() => useAuth(), { wrapper })

    await result.current.loginWithEmail('test@example.com', 'secret', false)

    expect(signInSpy).toHaveBeenCalledWith('test@example.com', 'secret', false)
  })

  it('delegates Google login to the auth service', async () => {
    const googleSpy = vi.mocked(authServices.signInWithGoogle)
    googleSpy.mockResolvedValue(undefined)

    const { result } = renderHook(() => useAuth(), { wrapper })

    await result.current.loginWithGoogle(false)

    expect(googleSpy).toHaveBeenCalledWith(false)
  })
})
