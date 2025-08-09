// lib/client/api.ts
export async function register(username: string, password: string) {
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

export async function login(username: string, password: string) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

export async function fetchStats() {
    const res = await fetch('https://location-server-one.vercel.app/api/stats');
    return await res.json();
}

export async function fetchUsers() {
    const res = await fetch('https://location-server-one.vercel.app/api/users');
    return await res.json();
}

export async function fetchLocations() {
    const res = await fetch('https://location-server-one.vercel.app/api/locations');
    return await res.json();
}