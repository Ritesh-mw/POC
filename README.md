# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Steps to run the Feature Flag POC locally

1. **Install Node.js** (skip if already installed)

   * Download from [https://nodejs.org](https://nodejs.org)
   

2. **Clone the repository**

   ```bash
   git clone <https://github.com/Ritesh-mw/POC.git>
   cd <POC>
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

   *(This installs everything listed in `package.json`, including `launchdarkly-js-client-sdk` if it's in your dependencies.)*

4. **Configure LaunchDarkly**

   * Log into [LaunchDarkly](https://launchdarkly.com).
   * Create **two feature flags** in your project:

     * `feedback-form-enabled`
     * `product-page-enabled`
   * Copy your **Client-side ID** from LaunchDarkly → Project Settings → **Client-side ID**.
   * Replace the placeholder in your React code(src/app.jsx):

     ```js
     const client = LDClient.initialize("<YOUR-CLIENT-SIDE-ID>", { key: "anonymous-user" });
     ```

5. **Run the application**

   ```bash
   npm run dev
   ```

   *(If you’re using Vite, this starts a dev server at [http://localhost:5173](http://localhost:5173) by default. If using CRA, it’s [http://localhost:3000](http://localhost:3000).)*

6. **Test feature flags**

   * Open the app in your browser.
   * In LaunchDarkly’s UI, toggle the flags **on/off**.
   * Confirm the UI updates immediately (button vs form, product page availability).

---


