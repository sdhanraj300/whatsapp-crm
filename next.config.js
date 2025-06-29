// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Enable static export
  output: 'export',
  
  // Configure static export settings
  distDir: 'out',
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Disable ESLint and TypeScript during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable the X-Powered-By header
  poweredByHeader: false,
  
  // Skip API routes during export
  skipTrailingSlashRedirect: true,
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `node:` protocol (not available in browser)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        dgram: false,
        zlib: false,
        http2: false,
        process: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        http: false,
        https: false,
        os: false,
      };
    }
    return config;
  },
  
};

module.exports = nextConfig;
