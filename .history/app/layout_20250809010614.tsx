// app/layout.tsx
import 'leaflet/dist/leaflet.css'
import './globals.css'
import { Inter } from 'next/font/google'
const locations: Location[] = [
  {
    id: 1,
    latitude: 35.6892,
    longitude: 51.3890,
    username: 'مهدی',
    timestamp: new Date(),
  },
  // موارد بیشتر...
]
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Location Tracker',
  description: 'داشبورد با نقشه و موقعیت کاربران',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <main style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
          {children}
        </main>
      </body>
    </html>
  )
}