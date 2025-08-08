// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem('token');
        if (!t) return router.replace('/login');
        setToken(t);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (!token) return <p>در حال بارگذاری…</p>;

    return (
        <div>
            <h2>داشبورد</h2>
            <p>توکن شما: <code>{token.slice(0, 20)}…</code></p>
            <button onClick={handleLogout}>خروج</button>
        </div>
    );
}