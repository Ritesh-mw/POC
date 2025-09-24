import { usePostHog } from 'posthog-js/react';
import { AnalyticsEvents } from './config.js';

export function useAnalytics() {
    const posthog = usePostHog();

    const capture = (eventName, properties) => {
        try {
            posthog?.capture(eventName, properties);
        } catch (_) { }
    };

    return {
        capture,
        events: AnalyticsEvents,
    };
}


