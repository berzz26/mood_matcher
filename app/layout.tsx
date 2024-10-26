import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from "./components/SessionProvider"
import NavBar from './components/NavBar' // Import the new NavBar component
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-100 to-green-100 min-h-screen`}>
        <SessionProvider session={session}>
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {children}
            <NavBar /> {/* Use the NavBar component here */}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
