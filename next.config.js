/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  // Disable font optimization — we load fonts via <link> in layout head
  // This prevents build errors when Google Fonts is unreachable (e.g. CI environments)
  optimizeFonts: false,
};

module.exports = nextConfig;
