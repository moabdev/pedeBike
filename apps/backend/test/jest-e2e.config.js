module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src', 
  testEnvironment: 'node',
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', 
  },
  coverageDirectory: '../coverage/e2e', 
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};
