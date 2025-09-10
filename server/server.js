import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(cors({
    origin: "https://papaya-choux-8425ed.netlify.app", // your Netlify URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api', authRoutes);

app.get('/', (_req, res) => {
    res.type('text/plain').send('Backend is running');
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on http://localhost:5000');
});


