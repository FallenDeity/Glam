/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	distDir: "dist",
	images: {
		remotePatterns: [
			{
				hostname: "**",
				protocol: "https",
			},
		],
	},
};

module.exports = nextConfig;
