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
    
    // Exclude API routes from client bundle
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'next-auth/next': false,
        'next-auth/react': false,
        'next-auth': false,
      };
    }
    
    return config;
  },
  
  // Exclude API routes from static export
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/register': { page: '/register' },
      '/dashboard': { page: '/dashboard' },
      '/unauthorized': { page: '/unauthorized' },
    };
    return paths;
  },
};

module.exports = nextConfig;
