/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  images: { unoptimized: true },

  // Enable source maps in production to see real stack traces in the browser
  productionBrowserSourceMaps: true,

  // Keep static export disabled for dynamic/auth routes
  // output: 'export',

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
