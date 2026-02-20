import { useState } from 'react'
import { login, logout } from '../api/auth-services'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // Firebase onAuthStateChanged logic here...
  return { user, isAuthenticated: !!user, login, logout, loading }
}
