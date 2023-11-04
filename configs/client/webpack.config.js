const { merge } = require('webpack-merge')

const globalConfig = {}

/**
 * A higher-order function that returns a configuration enhancer for webpack.
 *
 * @returns {import("@nx/webpack").NxWebpackPlugin}
 */
const withGlobal = () => (config, _context) => merge(config, globalConfig)

module.exports = {
  withGlobal,
}

module.exports.default = globalConfig
