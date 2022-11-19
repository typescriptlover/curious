/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.NODE_ENV === 'production',
});

module.exports = withBundleAnalyzer({
   reactStrictMode: true,
   swcMinify: true,
   poweredByHeader: false,
   trailingSlash: false,
});
