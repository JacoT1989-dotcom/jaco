/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      enabled: true,
    },
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
};

export default nextConfig;
