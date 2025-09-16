// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'
import Auth from './pages/Auth.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
  // // Ensure feature flags are loaded immediately and persisted
  // bootstrap: {
  //   featureFlags: {},
  // },
  // // Enable real-time feature flag updates
  // loaded: (posthog) => {
  //   // PostHog is now loaded and ready
  //   console.log('PostHog loaded successfully');
  //   // Force reload feature flags on initial load to ensure fresh data
  //   posthog.reloadFeatureFlags();
  // },
  // // Configure feature flag polling for better reliability
  // feature_flags: {
  //   // Poll for feature flag updates every 10 seconds
  //   polling_interval: 10000,
  // },
  // // Ensure feature flags are persisted in localStorage
  // persistence: 'localStorage',
  // // Enable automatic feature flag reloading
  // autocapture: false, // Disable autocapture to focus on feature flags
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
);
