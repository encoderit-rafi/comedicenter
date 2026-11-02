/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    
    },
    images: {
      domains: ["cosmedics3.s3.us-east-1.amazonaws.com","s3.us-east-1.amazonaws.com","cosmedics3.s3.amazonaws.com"],
    }
  };

export default nextConfig;
