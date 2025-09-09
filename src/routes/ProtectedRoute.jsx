import { Navigate } from 'react-router-dom';
import { getToken } from '../api.js';

export default function ProtectedRoute({ children }) {
    const token = getToken();
    if (!token) return <Navigate to="/auth" replace />;
    return children;
}


