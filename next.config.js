/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com", "qoqdvqfsvvzrlxuasgks.supabase.co"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
