// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';






// بارگذاری کامپوننت‌های react-leaflet به‌صورت دینامیک
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
)
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
)
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
)
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
)

// آیکون پیش‌فرض Leaflet را تنظیم می‌کنیم (به دلیل باگ در آدرس‌دهی)
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});


type Location = {
    id: string
    username: string
    latitude: number
    longitude: number
    timestamp: string
}

export default function DashboardPage() {
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)
    const [locations, setLocations] = useState<Location[]>([])
    const [loading, setLoading] = useState(true)

    // بررسی توکن و دریافت داده‌ها
    useEffect(() => {
        const t = localStorage.getItem('token')
        if (!t) return router.replace('/login')
        setToken(t)

        fetch('/api/locations', {
            headers: { Authorization: `Bearer ${t}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setLocations(data.locations || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    if (!token) {
        return <p>در حال انتقال به صفحه‌ی ورود…</p>
    }

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>داشبورد نقشه</h2>
                <button onClick={handleLogout}>خروج</button>
            </header>

            {loading ? (
                <p>در حال بارگذاری موقعیت‌ها…</p>
            ) : (
                <MapContainer
                    center={[35.6892, 51.3890]} // تهران
                    zoom={9}
                    maxZoom={18}
                    style={{ height: '70vh', width: '100%', marginTop: 16 }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MarkerClusterGroup chunkedLoading>
                        {locations.map((loc) => (z
                            <Marker 
                                key={loc.id}
                                position={[loc.latitude, loc.longitude]}
                            >
                                <Popup>
                                    کاربر: {loc.username}
                                    <br />
                                    زمان: {new Date(loc.timestamp).toLocaleString('fa-IR')}
                                </Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                </MapContainer>

            )}
        </div>
    )
}