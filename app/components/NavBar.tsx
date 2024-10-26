'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut, Home } from 'lucide-react'
import { useState } from 'react'

export default function NavBar() {
  const { data: session } = useSession()
  const [tooltip, setTooltip] = useState('')

  return (
    <nav className="flex justify-around items-center p-4 bg-white border-t border-gray-200 relative">
      <div 
        className="relative flex items-center"
        onMouseEnter={() => setTooltip('Home')}
        onMouseLeave={() => setTooltip('')}
      >
        <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors flex items-center transform hover:scale-110">
          <Home size={24} />
        </Link>
        {tooltip === 'Home' && (
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded p-1 transition-opacity duration-300 opacity-100 pointer-events-none">
            Home
          </span>
        )}
      </div>
      
      {session ? (
        <>
          

          <div 
            className="relative flex items-center"
            onMouseEnter={() => setTooltip('Logout')}
            onMouseLeave={() => setTooltip('')}
          >
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-gray-600 hover:text-blue-500 transition-colors flex items-center transform hover:scale-110"
            >
              <LogOut size={24} />
            </button>
            {tooltip === 'Logout' && (
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded p-1 transition-opacity duration-300 opacity-100 pointer-events-none">
                Logout
              </span>
            )}
          </div>
        </>
      ) : null}
    </nav>
  )
}
