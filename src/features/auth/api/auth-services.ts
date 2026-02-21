import { auth } from '@/lib/db/firebase-config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
export const logout = () => signOut(auth)
