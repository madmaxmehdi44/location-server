// app/layout.tsx
import 'leaflet/dist/leaflet.css'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Location Tracker',
  description: 'داشبورد با نقشه و موقعیت کاربران',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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