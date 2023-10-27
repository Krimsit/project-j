const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  'styled-components',
  'axios',
])

module.exports = {
  // Share core libraries, and avoid everything else
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return defaultConfig
    }

    // Returning false means the library is not shared.
    return false
  },
}
