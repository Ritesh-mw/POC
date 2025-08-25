import React, { useEffect, useState } from "react";
import * as LDClient from "launchdarkly-js-client-sdk";

export default function App() {
    const [ldClient, setLdClient] = useState(null);
    const [showDiscount, setShowDiscount] = useState(false);

    useEffect(() => {
        // 1. Initialize LaunchDarkly client
        const client = LDClient.initialize("68a6b050e1f88309c2109156", {
            key: "anonymous-user", // identify user (anonymous)
        });

        client.on("ready", () => {
            // 2. Get initial flag value
            const flagValue = client.variation("discount-button-enabled", false);
            setShowDiscount(flagValue);

            // 3. Update if flag changes in real time
            client.on("change:discount-button-enabled", (newValue) => {
                setShowDiscount(newValue);
            });
        });

        setLdClient(client);
    }, []);

    // 4. Render the app
    return (
        <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to Our Store</h1>
            <p>Find the best deals on your favorite products!</p>

            {showDiscount ? (
                <button
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#ff9800",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                    onClick={() => alert("Your coupon code is SAVE10")}
                >
                    Get 10% Discount!
                </button>
            ) : (
                <p style={{ color: "gray" }}>No special offers right now.</p>
            )}
        </div>
    );
}
