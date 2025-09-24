import React from 'react';

export default function ProductB() {
    return (
        <div style={{ fontFamily: 'Inter, Arial, sans-serif', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product B</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                This is a simple page for Product B. Add details, imagery, and FAQs here.
                This page appears only when the Product B feature flag allows navigation.
            </p>
        </div>
    );
}


