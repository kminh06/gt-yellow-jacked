import { auth } from '@/lib/db/firebase-config'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { ensureUserDocument } from './user-profile'

type AuthErrorCode =
  | 'auth/invalid-email'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/popup-closed-by-user'
  | 'auth/network-request-failed'
  | 'auth/too-many-requests'
  | string


export class AuthServiceError extends Error {
  code: AuthErrorCode

  constructor(code: AuthErrorCode, message: string) {
    super(message)
    this.code = code
  }
}

const googleProvider = new GoogleAuthProvider()


function normalizeAuthError(err: unknown): AuthServiceError {
  const code = (err as { code?: string })?.code ?? 'auth/unknown'
  const messageByCode: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-not-found': 'No account found for this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'Email is already in use.',
    'auth/popup-closed-by-user': 'Google sign-in popup was closed.',
    'auth/network-request-failed': 'Network error. Please try again.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
  }

  return new AuthServiceError(
    code,
    messageByCode[code] ?? 'Authentication failed.',
  )
}

async function applyPersistence(rememberMe = false) {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence,
  )
}


export async function signInWithEmail(
  email: string,
  password: string,
  rememberMe = false,
) {
  try {
    await applyPersistence(rememberMe)
    const cred = await signInWithEmailAndPassword(auth, email, password)
    await ensureUserDocument(cred.user)
    return cred.user
  } catch (err) {
    throw err
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  rememberMe = false,
) {
  try {
    await applyPersistence(rememberMe)
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await ensureUserDocument(cred.user)
    return cred.user
  } catch (err) {
    throw err
  }
}

export async function signInWithGoogle(rememberMe = false) {
  try {
    await applyPersistence(rememberMe)
    const cred = await signInWithPopup(auth, googleProvider)
    await ensureUserDocument(cred.user)
    return cred.user
  } catch (err) {
    throw err
  }
}

export async function logout() {
  try {
    await signOut(auth)
  } catch (err) {
    throw err
  }
}
