import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Required for Vercel deployment
  output: 'standalone',
  // Enable React Strict Mode
  reactStrictMode: true,
  // Images configuration
  images: {
    domains: ['localhost'], // Add your domain here for production
  },
  // Environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  // Enable server components
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

export default nextConfig;
