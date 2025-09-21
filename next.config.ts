import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Ignore canvas and other node-specific modules in client build
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        encoding: false,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Ignore pdfjs canvas import
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    turbo: {
      rules: {},
    },
  },
};

export default nextConfig;