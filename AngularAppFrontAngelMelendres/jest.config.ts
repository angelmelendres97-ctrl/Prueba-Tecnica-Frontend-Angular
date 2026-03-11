import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/main.ts',
    '!src/**/*.routes.ts',
    '!src/**/*.config.ts',
    '!src/environments/**',
    '!src/app/**/index.ts',
    '!src/app/**/*.model.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default config;
