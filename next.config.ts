/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    turbo: {
      rules: {} // سيبها فاضية لو مش هتستخدم إعدادات خاصة
    },
  },
};

module.exports = nextConfig;
