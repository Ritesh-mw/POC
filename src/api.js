const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function apiPost(path, body, token) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

export async function apiGet(path, token) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

export function saveToken(token) {
    localStorage.setItem('auth_token', token);
}

export function getToken() {
    return localStorage.getItem('auth_token');
}

export function clearToken() {
    localStorage.removeItem('auth_token');
}


