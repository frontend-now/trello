module.export = {
  transform: {
    '\\.(js|jsx)?$': 'babel-jest'
  },
  // rootDir: './',
  roots: [ '<rootDir>' ],
  modulePaths: [ 'src' ],
  testMatch: [ '<rootDir>/src/**/>(*.)test.{js, jsx}' ],
  moduleFileExtensions: [ 'js', 'jsx', 'json', 'node' ],
  testPathIgnorePatterns: [ '/node_modules/', '/dist/', '/test_utils/' ],
  // moduleDirectories: [ 'node_modules', '<rootDir>/src' ],
  moduleNameMapper: {
    '^root(.*)$': '<rootDir>/src$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^actions(.*)$': '<rootDir>/src/actions$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/test_utils/setupTests.js'
  ]
}
