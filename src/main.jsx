import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AnalyticsProvider from './analytics/posthog/provider.jsx'
import './index.css'
import App from './App.jsx'
import ProductC from './pages/ProductC.jsx'
import ProductB from './pages/ProductB.jsx'
import Auth from './pages/Auth.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnalyticsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
          <Route path="/product-c" element={<ProtectedRoute><ProductC /></ProtectedRoute>} />
          <Route path="/product-b" element={<ProtectedRoute><ProductB /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AnalyticsProvider>
  </StrictMode>,
);
