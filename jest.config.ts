import type { Config } from "jest";
import nextJest from "next/jest.js";
import { pathsToModuleNameMapper } from "ts-jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/"],
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "@/*": ["./src/*"],
      "@tests/*": ["./__tests__/*"],
    },
    {
      prefix: "<rootDir>/",
    }
  ),
};

export default createJestConfig(config);
