import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    async redirects() {
        return [
            { source: '/industries', destination: '/services', permanent: true },
        ];
    },
};

export default nextConfig;
