module.exports = {
  preset: "@shelf/jest-mongodb",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      diagnostics: false, // Disable typescript type-checks during test runs
    },
  },
};
