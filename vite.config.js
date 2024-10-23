import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel";
import ReactDOM from "react-dom/client";
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: process.env.PORT,
    },
    // base: "undiscovered-website",
    plugins: [react(), vercel()],
});
