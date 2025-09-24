// Centralized PostHog configuration helpers

export function getPosthogApiKey() {
    return import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
}

export function getPosthogOptions() {
    return {
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        person_profiles: 'identified_only',
        // Prevent anonymous sessions after logout until explicit opt-in
        opt_out_capturing_by_default: true,
    };
}

// Standardize commonly used event names here if desired
export const AnalyticsEvents = {
    ProductAClicked: 'product_a_clicked',
    ProductBClicked: 'product_b_clicked',
    ProductCClicked: 'product_c_clicked',
    ProductModalClosed: 'product_modal_closed',
    FeedbackButtonClicked: 'feedback_button_clicked',
    FeedbackSubmitted: 'feedback_submitted',
    FeedbackModalClosed: 'feedback_modal_closed',
};

// Standardize commonly used feature flags here
export const FeatureFlags = {
    FeedbackFormEnabled: 'feedback-form-enabled',
    ProductPageEnabled: 'product-page-enabled',
    ProductAEnabled: 'product-a-enabled',
    ProductCEnabled: 'product-c-enabled',
};


