import posthog from 'posthog-js';

export function identifyUser(distinctId, properties = {}) {
    try {
        if (!distinctId) return;
        posthog.identify(distinctId, properties);
    } catch (_) { }
}

export function resetIdentity() {
    try {
        posthog?.reset();
    } catch (_) { }
}

export function optOutAnalytics() {
    try {
        posthog?.opt_out_capturing();
    } catch (_) { }
}

export function optInAnalytics() {
    try {
        posthog?.opt_in_capturing();
    } catch (_) { }
}


