/** @type {import('next').NextConfig} */
const nextConfig = {
  // ====== CORE SETTINGS ======
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  
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

  // ====== DEVELOPMENT FEATURES ======
  // Enable source maps to debug production issues
  productionBrowserSourceMaps: true,
  
  // ====== SECURITY HEADERS ======
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // ====== API ROUTES CONFIGURATION ======
  async rewrites() {
    return [
      // Proxy to your Laravel backend if needed
      {
        source: '/backend/:path*',
        destination: 'https://api.404movers.ca/:path*',
      },
    ];
  },

  // ====== REDIRECTS ======
  async redirects() {
    return [
      // Redirect old URLs to new structure
      {
        source: '/old-upload',
        destination: '/test-upload',
        permanent: true,
      },
    ];
  },

  // ====== WEBPACK CONFIGURATION ======
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // ====== SVG SUPPORT ======
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // ====== FILE UPLOAD OPTIMIZATION ======
    if (isServer) {
      // Increase payload size limits for file uploads
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    // ====== BUNDLE ANALYZER (Development) ======
    if (dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(true),
        })
      );
    }

    // ====== PRODUCTION OPTIMIZATIONS ======
    if (!dev) {
      config.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(false),
        })
      );
    }

    return config;
  },

  // ====== ENVIRONMENT VARIABLES ======
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    UPLOAD_MAX_SIZE: process.env.UPLOAD_MAX_SIZE || '52428800', // 50MB
  },

  // ====== EXPERIMENTAL FEATURES ======
  experimental: {
    // Enable new features for better performance
    serverComponentsExternalPackages: ['formidable'],
    optimizePackageImports: ['react-icons'],
  },

  // ====== COMPILER OPTIONS ======
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // ====== OUTPUT CONFIGURATION ======
  // Keep static export disabled for dynamic/auth routes and API routes
  // output: 'export', // Commented out because we need API routes

  // ====== TYPESCRIPT CONFIGURATION ======
  typescript: {
    // Ignore TypeScript errors during build (optional)
    ignoreBuildErrors: false,
  },

  // ====== ESLint CONFIGURATION ======
  eslint: {
    // Warning: This allows production builds to successfully complete even if ESLint errors
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
