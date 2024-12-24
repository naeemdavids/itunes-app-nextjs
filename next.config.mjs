/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode for development builds
  swcMinify: true, // Enables the SWC compiler for minification (default for Next.js)
  experimental: {
    appDir: true, // Enables the App Directory, required for SSR with React 18 features
    reactRoot: true, // Enables React 18's root API, which includes Suspense support
  },
  webpack(config, { dev }) {
    // Disable source maps in production for better build performance
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
