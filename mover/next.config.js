/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    unoptimized: true,
  },

  // Removed the static export so dynamic routes (like authenticated pages) can be server-rendered.
  // output: 'export',
};

module.exports = nextConfig;
