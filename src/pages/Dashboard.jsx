import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, getToken, clearToken } from '../api.js';

export default function Dashboard() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }
        apiGet('/api/dashboard', token)
            .then((data) => setMessage(data.message))
            .catch((err) => {
                setError(err.message || 'Failed to fetch dashboard');
                clearToken();
                navigate('/login');
            });
    }, [navigate]);

    return (
        <div className="auth-container">
            <h2>Dashboard</h2>
            {message && <p>{message}</p>}
            {error && <div className="error">{error}</div>}
            <button onClick={() => { clearToken(); navigate('/login'); }}>Logout</button>
        </div>
    );
}


