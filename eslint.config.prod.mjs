// @ts-check
import baseConfig from "./eslint.config.mjs";

const ciConfig = [
  ...baseConfig,
  {
    files: ["*.js", "*.jsx"], // Target only .js and .jsx files
    rules: {
      "no-unused-vars": "error",
    },
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];

export default ciConfig;
