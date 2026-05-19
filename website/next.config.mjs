/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Render at a higher base quality so brand photography stays sharp.
    // Individual <Image quality={...}> still wins per-instance.
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 320, 384, 480, 600, 750],
    // Allow Instagram CDN domains so og:image thumbnails can render via
    // next/image. Hostnames look like:
    //   scontent-ams4-1.cdninstagram.com
    //   instagram.fams4-1.fna.fbcdn.net
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "instagram.com" },
    ],
  },
};

export default nextConfig;
