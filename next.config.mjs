/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            },
            {
                protocol: "http",
                hostname: "localhost"
            }
        ]
    }
};

export default nextConfig;
