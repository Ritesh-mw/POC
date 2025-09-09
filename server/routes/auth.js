import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../utils/authMiddleware.js';

const router = Router();

// In-memory user store
const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const TOKEN_EXPIRES_IN = '1h';

// Helpers
function isValidEmail(email) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

function isValidPassword(password) {
    return typeof password === 'string' && password.length >= 6;
}

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!isValidEmail(email) || !isValidPassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password too short' });
        }

        const existing = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = { email, passwordHash };
        users.push(user);

        return res.status(201).json({ message: 'Signup successful. Please login.' });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('SIGNUP_ERROR', { error: String(error), stack: error?.stack });
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!isValidEmail(email) || !isValidPassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
        return res.json({ token });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('LOGIN_ERROR', { error: String(error), stack: error?.stack });
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/dashboard', authMiddleware, (req, res) => {
    // req.user was set by authMiddleware after verifying token
    return res.json({ message: `Welcome ${req.user.email}` });
});

export default router;


