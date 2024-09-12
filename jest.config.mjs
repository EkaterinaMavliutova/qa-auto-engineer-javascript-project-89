/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  extensionsToTreatAsEsm: ['.ts', '.jsx', '.tsx'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/utils.js'],
}

export default config;
