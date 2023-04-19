// eslint-disable-next-line import/no-extraneous-dependencies
const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
