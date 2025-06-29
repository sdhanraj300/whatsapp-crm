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
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Skip Node.js modules in client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
  
  // Experimental features
  experimental: {
    // No experimental features needed for now
  },
  
  // Skip API routes during export
  skipTrailingSlashRedirect: true,
  
  // Configure external packages for server components
  serverExternalPackages: ['@prisma/client'],
};

module.exports = nextConfig;
