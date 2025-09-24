import React, { useState } from "react";
import { useAnalytics } from './analytics/posthog/events.js';
import { useFeedbackFormFlag, useProductPageFlag, useProductAFlag, useProductCFlag } from './analytics/posthog/flags.js';
import { resetIdentity, optOutAnalytics } from './analytics/posthog/identity.js';
import { useNavigate } from 'react-router-dom';
import { clearToken } from './api.js'

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  const { capture, events } = useAnalytics();
  const navigate = useNavigate();

  // Use centralized feature flag hooks
  const feedbackFlagEnabled = useFeedbackFormFlag();
  const productPageFlagEnabled = useProductPageFlag();
  const productAFlagEnabled = useProductAFlag();
  const productCFlagEnabled = useProductCFlag();

  // No local mirroring of feature flags needed; use hooks directly

  const handleLogout = () => {
    clearToken();
    optOutAnalytics();
    resetIdentity();
    window.location.href = '/auth';
  };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh", color: "#111" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#1f2937", padding: "1rem 2rem", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>XYZ Enterprise</h1>
        <nav>
          <a href="#" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>Home</a>
          <a href="#" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>Products</a>
          <a href="#" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>About</a>
          <button
            onClick={handleLogout}
            style={{ margin: "0 1rem", color: "white", textDecoration: "none", background: 'transparent', border: '1px solid #fff', padding: '6px 10px', borderRadius: 6 }}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "#e5e7eb" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>Welcome to XYZ Enterprise</h2>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
          Delivering innovative solutions for modern businesses. Discover how we can help your enterprise grow.
        </p>
      </section>

      {/* Main Content */}
      <main style={{ padding: "3rem 2rem", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "300px",
            textAlign: "center",
            cursor: productAFlagEnabled ? "pointer" : "not-allowed",
            opacity: productAFlagEnabled ? 1 : 0.6,
          }}
          onClick={() => {
            if (productAFlagEnabled) {
              capture(events.ProductAClicked, {
                feature_flag_enabled: true,
              });
              setOpenModal(true);
            }
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Product A</h3>
          <p>{productAFlagEnabled ? "Click to learn more." : "Coming soon."}</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "300px",
            textAlign: "center",
            cursor: productPageFlagEnabled ? "pointer" : "not-allowed",
            opacity: productPageFlagEnabled ? 1 : 0.6,
          }}
          onClick={() => {
            if (productPageFlagEnabled) {
              capture(events.ProductBClicked, {
                feature_flag_enabled: true,
              });
              navigate('/product-b');
            }
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Product B</h3>
          <p>{productPageFlagEnabled ? "Click to learn more." : "Coming soon."}</p>
        </div>

        <div
          style={{
            backgroundColor: "white", padding: "2rem", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "300px", textAlign: "center",
            cursor: productCFlagEnabled ? "pointer" : "not-allowed", opacity: productCFlagEnabled ? 1 : 0.6
          }}
          onClick={() => {
            if (productCFlagEnabled) {
              capture(events.ProductCClicked, { feature_flag_enabled: true });
              navigate('/product-c');
            }
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Product C</h3>
          <p>{productCFlagEnabled ? "Click to learn more." : "Coming soon."}</p>
        </div>
      </main>

      {/* Product Modal */}
      {openModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
          onClick={() => setOpenModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "1rem",
              width: "90%",
              maxWidth: "500px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Product Details</h2>
            <p>This is where you can provide more information about the product.</p>
            <button
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1rem",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => {
                capture(events.ProductModalClosed);
                setOpenModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feedback Button (PostHog Feature Flag) */}
      {feedbackFlagEnabled && (
        <section style={{ padding: "3rem 2rem", backgroundColor: "#f3f4f6", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "600", marginBottom: "1.5rem" }}>We value your feedback</h2>
          <button
            onClick={() => {
              capture(events.FeedbackButtonClicked, {
                feature_flag_enabled: true,
              });
              setOpenFeedback(true);
            }}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Give Feedback
          </button>
        </section>
      )}

      {/* Feedback Modal */}
      {openFeedback && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
          onClick={() => setOpenFeedback(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "1rem",
              width: "90%",
              maxWidth: "500px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Feedback Form</h2>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              onSubmit={(e) => {
                e.preventDefault();
                capture(events.FeedbackSubmitted, {
                  feature_flag_enabled: true,
                });
                alert('Feedback submitted! (This is just a demo)');
                setOpenFeedback(false);
              }}
            >
              <input type="text" placeholder="Your Name" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "0.5rem" }} />
              <input type="email" placeholder="Your Email" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "0.5rem" }} />
              <textarea placeholder="Your Feedback" rows="4" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "0.5rem" }} />
              <button
                type="submit"
                style={{
                  padding: "0.75rem",
                  fontSize: "1rem",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Submit Feedback
              </button>
            </form>
            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => {
                capture(events.FeedbackModalClosed);
                setOpenFeedback(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "1rem", backgroundColor: "#1f2937", color: "white" }}>
        &copy; {new Date().getFullYear()} XYZ Enterprise. All rights reserved.
      </footer>
    </div>
  );
}