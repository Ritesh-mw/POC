import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { email: payload.email };
        return next();
    } catch (_err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}


