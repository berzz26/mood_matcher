import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Home, User, Clock } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-100 to-green-100 min-h-screen`}>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {children}
          <nav className="flex justify-around items-center p-4 bg-white border-t border-gray-200">
            <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Home size={24} />
            </Link>
            <Link href="/account" className="text-gray-600 hover:text-blue-500 transition-colors">
              <User size={24} />
            </Link>
            <Link href="/history" className="text-gray-600 hover:text-blue-500 transition-colors">
              <Clock size={24} />
            </Link>
          </nav>
        </div>
      </body>
    </html>
  )
}