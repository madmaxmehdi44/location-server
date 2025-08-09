/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};
module.exports = nextConfig;

import path from 'path';

module.exports = {
  webpack: (config: { resolve: { alias: { [x: string]: string; }; }; module: { rules: { test: RegExp; use: string; }[]; }; }, { isServer }: unknown) => {
    // مثال: اضافه کردن alias
    config.resolve.alias['@components'] = path.join(__dirname, 'components');

    // مثال: اضافه کردن loader سفارشی
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
};