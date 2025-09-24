import React from 'react';

export default function ProductC() {
    return (
        <div style={{ fontFamily: 'Inter, Arial, sans-serif', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product C</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                This is a simple page for Product C. You can place product details, screenshots,
                FAQs, and any relevant content here. This page is shown only when the
                Product C feature flag is enabled.
            </p>
        </div>
    );
}


