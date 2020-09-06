module.exports = {
  coverageDirectory: '<rootDir>/tests/coverage', // Generate coverage from this dir
  verbose: true,
  rootDir: "./", // root dir to find jest.config.js
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  moduleFileExtensions: ['js'],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // collect coverage from these files: js/jsx under .src/
    "!**/node_modules/**", // ignore thid dir
    "!**/vendor/**" // ignore thid dir
  ],
  moduleDirectories: [
    'node_modules',
    'lib'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // map @ as src for shorten import statement
  },
  roots: ['<rootDir>/src/', '<rootDir>/tests/']
}
