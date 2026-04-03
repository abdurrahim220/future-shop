import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",

  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\\\(\\\\.)+\\\\.ts$": "ts-jest",
  },
  testRegex: "((\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js", "json", "node"],

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.ts"],
};

export default config;
