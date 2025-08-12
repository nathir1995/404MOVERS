/** @type {import('next').NextConfig} */
const nextConfig = {
  // ====== CORE SETTINGS ======
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  
  // ====== RAILWAY DEPLOYMENT ======
  output: 'standalone',
  
  // ====== PERFORMANCE OPTIMIZATIONS ======
  images: { 
    unoptimized: true,
    domains: [
      'api.404movers.ca',
      'storage.googleapis.com',
      'firebasestorage.googleapis.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // ====== SIMPLIFIED WEBPACK FOR RAILWAY ======
  webpack(config, { dev, isServer }) {
    // SVG Support
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Server-side optimizations
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },

  // ====== BUILD OPTIMIZATIONS ======
  experimental: {
    optimizePackageImports: ['react-icons'],
  },

  // ====== ERROR HANDLING ======
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ====== ENVIRONMENT VARIABLES ======
  env: {
    UPLOAD_MAX_SIZE: process.env.UPLOAD_MAX_SIZE || '52428800',
  },
};

module.exports = nextConfig;
