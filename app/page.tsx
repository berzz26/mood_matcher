'use client'

import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { Music } from 'lucide-react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="mb-8">
        <Music size={64} className="text-blue-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Music Mood Matcher</h1>
        <p className="text-gray-600">Discover the perfect playlist for your mood</p>
      </div>
      {session ? (
        <Link href="/mood-selector" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors text-lg">
          Start Matching
        </Link>
      ) : (
        <button onClick={() => signIn('spotify')} className="bg-[#1DB954] hover:bg-[#1ED760] text-white font-bold py-3 px-6 rounded-full transition-colors text-lg">
          Login with Spotify
        </button>
      )}
    </div>
  )
}