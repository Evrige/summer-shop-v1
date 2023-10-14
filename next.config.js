/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost'],
	},
	skipTrailingSlashRedirect: true,
	skipMiddlewareUrlNormalize: true
}

module.exports = nextConfig
