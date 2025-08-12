/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  
  images: { 
    unoptimized: true,
    domains: [
      'api.404movers.ca',
      'storage.googleapis.com',
      'firebasestorage.googleapis.com'
    ],
  },

  // ✅ WEBPACK: Handle optional server-side dependencies
  webpack: (config, { isServer }) => {
    // SVG Support
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // ✅ FIXED: Handle server-only dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    // ✅ EXTERNALIZE: Server-only packages
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'firebase-admin': 'firebase-admin',
        'nodemailer': 'nodemailer',
        'formidable': 'formidable',
      });
    }

    return config;
  },

  // ✅ EXPERIMENTAL: Server components
  experimental: {
    serverComponentsExternalPackages: [
      'firebase-admin',
      'nodemailer', 
      'formidable'
    ],
  },

  // ✅ BUILD: Allow errors to continue
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ HEADERS: Security and CSP configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.gstatic.com https://firebasestorage.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://khms0.googleapis.com https://khms1.googleapis.com https://storage.googleapis.com https://firebasestorage.googleapis.com",
              "connect-src 'self' https://maps.googleapis.com https://khms0.googleapis.com https://khms1.googleapis.com https://api.404movers.ca https://firestore.googleapis.com https://fcm.googleapis.com",
              "frame-src 'self'",
              "worker-src 'self' blob:",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
