/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdf2pic', 'pdf-lib', 'gm'],
  output: 'standalone',
};

module.exports = nextConfig; 