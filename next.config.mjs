/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    // Disable source maps in production
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
