module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', babel: true }],
  },
  testMatch: ['**/tests/**/*.test.(ts|js|tsx)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    './node_modules/',
    './docs/',
    './tests/',
    './dist/',
    './infra/',
    'src/index.ts',
    './development',
    'src/config/types',
  ],
};
