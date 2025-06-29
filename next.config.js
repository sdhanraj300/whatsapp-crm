// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Disable static optimization for API routes
  output: 'export',
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
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/register': { page: '/register' },
      '/dashboard': { page: '/dashboard' },
      '/unauthorized': { page: '/unauthorized' },
      // Add other static pages here
    };
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Skip API routes in client bundle
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
  
  // Disable server components runtime for static export
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  
  // Disable API routes for static export
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

module.exports = nextConfig;
