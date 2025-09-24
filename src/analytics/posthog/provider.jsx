import React from 'react';
import { PostHogProvider } from 'posthog-js/react';
import { getPosthogApiKey, getPosthogOptions } from './config.js';

export default function AnalyticsProvider({ children }) {
    const apiKey = getPosthogApiKey();
    const options = getPosthogOptions();
    return (
        <PostHogProvider apiKey={apiKey} options={options}>
            {children}
        </PostHogProvider>
    );
}


