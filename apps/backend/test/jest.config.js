// test/jest.config.js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$', 
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage/unit',
};
