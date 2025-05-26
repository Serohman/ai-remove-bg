// @ts-check
import baseConfig from "./eslint.config.mjs";

const ciConfig = [
  ...baseConfig,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-vars": "error",
    },
  },
];

export default ciConfig;
