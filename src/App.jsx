import React, { useEffect, useState } from "react";
import * as LDClient from "launchdarkly-js-client-sdk";

export default function App() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showProductPage, setShowProductPage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false); // for feedback modal

  useEffect(() => {
    // Initialize LaunchDarkly client
    const client = LDClient.initialize("68a6b050e1f88309c2109156", {
      key: "anonymous-user", // anonymous user
    });

    client.on("ready", () => {
      // Get initial flag values
      const feedbackFlag = client.variation("discount-button-enabled", false);
      const productPageFlag = client.variation("product-page-enabled", false);

      setShowFeedback(feedbackFlag);
      setShowProductPage(productPageFlag);

      // Update if feedback form flag changes
      client.on("change:discount-button-enabled", (newValue) => {
        setShowFeedback(newValue);
      });

      // Update if product page flag changes
      client.on("change:product-page-enabled", (newValue) => {
        setShowProductPage(newValue);
      });
    });
  }, []);

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh", color: "#111" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#1f2937", padding: "1rem 2rem", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>XYZ Enterprise</h1>
        <nav>
          <a href="#" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>Home</a>
          <a href="#" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>Products</a>
          <a href="#" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>About</a>
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
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "300px", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Product A</h3>
          <p>High-performance solution designed to scale with your business.</p>
        </div>

        {/* Product B uses LaunchDarkly flag */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "300px",
            textAlign: "center",
            cursor: showProductPage ? "pointer" : "not-allowed",
            opacity: showProductPage ? 1 : 0.6,
          }}
          onClick={() => showProductPage && setOpenModal(true)}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Product B</h3>
          <p>{showProductPage ? "Click to learn more." : "Coming soon."}</p>
        </div>

        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "300px", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Product C</h3>
          <p>Secure and cutting-edge technology for critical applications.</p>
        </div>
      </main>

      {/* Product B Modal */}
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
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Product B Details</h2>
            <p>This is where you can provide more information about Product B.</p>
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
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feedback Button (Feature Flag) */}
      {showFeedback && (
        <section style={{ padding: "3rem 2rem", backgroundColor: "#f3f4f6", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "600", marginBottom: "1.5rem" }}>We value your feedback</h2>
          <button
            onClick={() => setOpenFeedback(true)}
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
            <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
              onClick={() => setOpenFeedback(false)}
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
