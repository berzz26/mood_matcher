'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sun, Moon, Zap, Coffee, Heart, Headphones, Mic, Book, Smile, Frown, Music2Icon, Film } from 'lucide-react'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})

const moods = [
  { name: 'Happy', icon: Sun, query: 'happy' },
  { name: 'Chill', icon: Moon, query: 'chill' },
  { name: 'Energetic', icon: Zap, query: 'energetic' },
  { name: 'Focus', icon: Coffee, query: 'focus' },
  { name: 'Romantic', icon: Heart, query: 'romantic' },
  { name: 'Party', icon: Headphones, query: 'party' },
  { name: 'Workout', icon: Mic, query: 'workout' },
  { name: 'Study', icon: Book, query: 'study' },
  // New moods added
  { name: 'Relaxed', icon: Smile, query: 'relax' },
  { name: 'Sad', icon: Frown, query: 'sad' },
  { name: 'Chill Vibes', icon: Music2Icon, query: 'chill vibes' },
  { name: 'Film Score', icon: Film, query: 'film score' },
]

export default function MoodSelector() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleMoodSelect = async (query: string) => {
    setIsLoading(true)
    if (session?.accessToken) {
      spotifyApi.setAccessToken(session.accessToken as string)
      try {
        const data = await spotifyApi.searchPlaylists(query)
        if (data.body.playlists?.items.length) {
          const playlistId = data.body.playlists.items[0].id
          router.push(`/playlist?id=${playlistId}`)
        } else {
          console.error('No playlists found')
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching playlists:', error)
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">How are you feeling?</h1>
      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => handleMoodSelect(mood.query)}
            disabled={isLoading}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <mood.icon size={32} className="text-blue-500 mb-2" />
            <span className="text-gray-800">{mood.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}