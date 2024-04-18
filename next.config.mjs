/** @type {import('next').NextConfig} */
const nextConfig = {


    images : {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.facebookusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.instagramusercontent.com'
            },

        ]
    },

    // logging: {
    //     fetches: {
    //         fullUrl: true
    //     }
    // }
};

export default nextConfig;
