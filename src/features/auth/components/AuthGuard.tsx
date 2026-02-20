// This component can be used to wrap any part of the app that requires authentication

import { useAuth } from '../hooks/use-auth'

export function AuthGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isAuthenticated, loading } = useAuth()
  // You can add a loading state or redirect logic here based on isAuthenticated
  return <>{children}</>
}
