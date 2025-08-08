// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/client/api';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = await login(username, password);
        setLoading(false);

        if (data.error) {
            setError(data.error);
        } else {
            localStorage.setItem('token', data.token);
            router.push('/');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>ورود</h2>
            <div>
                <label>نام کاربری:</label><br />
                <input
                    type="text" value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div style={{ marginTop: 8 }}>
                <label>رمز عبور:</label><br />
                <input
                    type="password" value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
                {loading ? 'در حال ارسال...' : 'ورود'}
            </button>
        </form>
    );
}