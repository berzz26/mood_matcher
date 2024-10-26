import { Sun, Moon, Zap, Coffee } from 'lucide-react'

const moodHistory = [
  { mood: 'Happy', icon: Sun, date: '2023-05-15', time: '14:30' },
  { mood: 'Chill', icon: Moon, date: '2023-05-14', time: '20:15' },
  { mood: 'Energetic', icon: Zap, date: '2023-05-13', time: '08:45' },
  { mood: 'Focus', icon: Coffee, date: '2023-05-12', time: '11:00' },
]

export default function History() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Mood History</h1>
      <div className="space-y-4">
        {moodHistory.map((entry, index) => (
          <div key={index} className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow">
            <entry.icon size={24} className="text-blue-500" />
            <div>
              <h3 className="font-semibold text-gray-800">{entry.mood}</h3>
              <p className="text-gray-600 text-sm">{entry.date} at {entry.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}