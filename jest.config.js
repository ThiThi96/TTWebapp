module.exports = {
  "collectCoverage": true,
  "rootDir": "./",
  "transform": {
    '^.+\\.js?$': "babel-jest"
  },
  "moduleFileExtensions": ["js"],
  "moduleDirectories": [
    "node_modules",
    "lib"
  ],
  'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
}