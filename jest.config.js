const createJestConfig = require("next/jest");

const createConfig = createJestConfig({
  dir: "./",
});

module.exports = createConfig({
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/app/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
});
