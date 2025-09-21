import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Handle react-pdf and canvas issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        encoding: false,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Handle react-pdf worker
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };

    // Handle .mjs files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

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