/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'opmsmqtxqrivlyigpudk.supabase.co', 'i.ibb.co'],
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig
