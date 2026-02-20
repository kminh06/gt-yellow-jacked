'use client'
import { useState, useEffect } from 'react'
import { Capacitor } from '@capacitor/core'

// Use this by calling: "const isNative = useIsNative();" in any component.
export function useIsNative() {
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform())
  }, [])

  return isNative
}
