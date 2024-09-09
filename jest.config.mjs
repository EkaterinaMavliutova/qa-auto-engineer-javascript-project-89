/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  }
}

export default config;
