/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
