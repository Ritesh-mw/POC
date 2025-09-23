import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost, saveToken } from '../api.js';
import posthog from 'posthog-js';

export default function Auth() {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidEmail = (val) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);

    const identifyWithPostHog = (username) => {
        try {
            if (!username) return;
            // Use email as distinct_id and set username as a person property
            posthog.identify(username, { username });
        } catch (e) {
            // noop
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!isValidEmail(email)) {
            setError('Please enter a valid email');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            if (mode === 'signup') {
                await apiPost('/api/signup', { email, password });
                // Auto-login after signup
                const { token } = await apiPost('/api/login', { email, password });
                saveToken(token);
                identifyWithPostHog(email);
                navigate('/');
            } else {
                const { token } = await apiPost('/api/login', { email, password });
                saveToken(token);
                identifyWithPostHog(email);
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                    style={{ background: mode === 'login' ? '#2563eb' : '#e5e7eb', color: mode === 'login' ? '#fff' : '#111827' }}
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
                    style={{ background: mode === 'signup' ? '#2563eb' : '#e5e7eb', color: mode === 'signup' ? '#fff' : '#111827' }}
                >
                    Sign Up
                </button>
            </div>

            <h2 style={{ marginTop: 0 }}>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={onSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
                </button>
            </form>
        </div>
    );
}


