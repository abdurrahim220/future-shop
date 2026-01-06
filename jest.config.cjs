/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",

  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testRegex: ["/tests/.*\\.(test|spec)?\\.(ts)$"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
