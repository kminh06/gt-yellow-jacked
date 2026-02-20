'use client'
import Link from 'next/link'
import { Home, User, Settings, Search } from 'lucide-react'

export function BottomNav() {
  return (
    <nav className='fixed bottom-0 left-0 right-0 border-t bg-background'>
      {/* The 'pb-[env(safe-area-inset-bottom)]' adds extra padding ONLY on phones that have a swipe bar.
       */}
      <div className='flex justify-around items-center h-16 pb-[env(safe-area-inset-bottom)]'>
        <Link href='/' className='flex flex-col items-center text-xs'>
          <Home className='h-5 w-5' />
          <span>Home</span>
        </Link>
        {/* <Link href='/search' className='flex flex-col items-center text-xs'>
          <Search className='h-5 w-5' />
          <span>Search</span>
        </Link>
        <Link href='/profile' className='flex flex-col items-center text-xs'>
          <User className='h-5 w-5' />
          <span>Profile</span>
        </Link> */}
      </div>
    </nav>
  )
}
