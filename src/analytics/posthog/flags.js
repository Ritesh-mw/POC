import { useFeatureFlagEnabled } from 'posthog-js/react';
import { FeatureFlags } from './config.js';

export function useFeedbackFormFlag() {
    return useFeatureFlagEnabled(FeatureFlags.FeedbackFormEnabled);
}

export function useProductPageFlag() {
    return useFeatureFlagEnabled(FeatureFlags.ProductPageEnabled);
}

export function useProductAFlag() {
    return useFeatureFlagEnabled(FeatureFlags.ProductAEnabled);
}

export function useProductCFlag() {
    return useFeatureFlagEnabled(FeatureFlags.ProductCEnabled);
}


