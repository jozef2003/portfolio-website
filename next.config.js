const { withNextVideo } = require('next-video/process')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    },
    experimental: {
     serverActions: true,
    }
};

module.exports = withNextVideo(nextConfig)
