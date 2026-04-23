'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Settings } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const normalizePath = (path: string) => {
    if (path === '/') return '/'
    return path.replace(/\/+$/, '')
  }

  const isActive = (href: string) =>
    normalizePath(pathname) === normalizePath(href)

  const getItemClassName = (active: boolean) =>
    `flex flex-col items-center text-xs transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`

  const getIconClassName = (active: boolean) =>
    `h-5 w-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`

  const getLabelClassName = (active: boolean) =>
    `mt-0.5 ${active ? 'font-semibold text-primary' : 'font-medium text-muted-foreground'}`

  return (
    <nav className='fixed bottom-0 left-0 right-0 border-t bg-background'>
      {/* The 'pb-[env(safe-area-inset-bottom)]' adds extra padding ONLY on phones that have a swipe bar.
       */}
      <div className='flex justify-around items-center h-16 pb-[env(safe-area-inset-bottom)]'>
        <Link href='/' className={getItemClassName(isActive('/'))}>
          <Home className={getIconClassName(isActive('/'))} />
          <span className={getLabelClassName(isActive('/'))}>Home</span>
        </Link>
        <Link
          href='/settings'
          className={getItemClassName(isActive('/settings'))}
        >
          <Settings className={getIconClassName(isActive('/settings'))} />
          <span className={getLabelClassName(isActive('/settings'))}>
            Settings
          </span>
        </Link>
      </div>
    </nav>
  )
}
