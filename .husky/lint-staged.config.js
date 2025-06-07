module.exports = {
  '**/package.json': ['sort-package-json "**/package.json"'],
  '*.{ts,tsx,js,jsx,json}': ['pnpm format-and-lint:fix'],
  '*.{ts,tsx,json}': () => 'pnpm typecheck --filter=[HEAD^1]',
}
