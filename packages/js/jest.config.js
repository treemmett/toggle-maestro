/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.ts'],
  testEnvironment: 'jsdom',
};
