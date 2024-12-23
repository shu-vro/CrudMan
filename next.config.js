/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
};

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
    autoPrefixer: {},
    nextConfig,
});
