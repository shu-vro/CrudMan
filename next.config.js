/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
};

const withPWA = require("next-pwa");

module.exports = {
    plugins: [
        withPWA({
            pwa: {
                dest: "public",
            },
        }),
        [
            "postcss-flexbugs-fixes",
            [
                "postcss-preset-env",
                {
                    autoprefixer: {},
                    stage: 3,
                    features: {
                        "custom-properties": false,
                    },
                },
            ],
        ],
        nextConfig,
    ],
};
