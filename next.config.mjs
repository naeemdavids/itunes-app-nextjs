/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignore linting issues during production build
  },
  webpack(config, { dev }) {
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
