/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
};

const withPWA = require("next-pwa");

module.exports = withPWA({
    pwa: {
        dest: "public",
        // disable: process.env.NODE_ENV === "development",
    },
    autoPrefixer: {},
    nextConfig,
});
