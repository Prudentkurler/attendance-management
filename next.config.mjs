/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: false, 
    images: {
        unoptimized: true, // Disable image optimization for static export
      },
    // Other existing configurations
  };

export default nextConfig;
