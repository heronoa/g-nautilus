import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/"],
};

export default createJestConfig(config);
