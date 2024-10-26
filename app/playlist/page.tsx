'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'
import { RefreshCcw } from 'lucide-react'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})

export default function Playlist() {
  const searchParams = useSearchParams()
  const playlistId = searchParams.get('id')
  const { data: session } = useSession()
  const [playlist, setPlaylist] = useState<any>(null)

  // Function to fetch the playlist
  const fetchPlaylist = async (id: string) => {
    if (session?.accessToken) {
      spotifyApi.setAccessToken(session.accessToken as string)
      try {
        const data = await spotifyApi.getPlaylist(id)
        setPlaylist(data.body)
      } catch (error) {
        console.error('Error fetching playlist:', error)
      }
    }
  }

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist(playlistId)
    }
  }, [session, playlistId])

  const handleRefresh = () => {
    if (playlistId) {
      fetchPlaylist(playlistId) // Call fetchPlaylist with the current playlist ID
    }
  }

  if (!playlist) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{playlist.name}</h1>
        <button 
          onClick={handleRefresh}
          className="text-gray-600 hover:text-blue-500 transition-colors"
          aria-label="Refresh Playlist"
        >
          <RefreshCcw size={24} />
        </button>
      </div>
      <div className="space-y-4 mb-8">
        {playlist.tracks.items.slice(0, 20).map((item: any, index: number) => (
          <div key={index} className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow">
            <Image 
              src={item.track.album.images[0].url} 
              alt={item.track.name} 
              width={80} 
              height={80} 
              className="rounded" 
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                <a 
                  href={item.track.external_urls.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-500 transition-colors"
                >
                  {item.track.name}
                </a>
              </h3>
              <p className="text-gray-600">{item.track.artists[0].name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
