// @ts-check
import {FlatCompat} from "@eslint/eslintrc";
import eslint from "@eslint/js";
import {dirname} from "path";
import tseslint from "typescript-eslint";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...tseslint.config(eslint.configs.recommended),
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tseslint.config(tseslint.configs.strict),
  {
    files: ["*.js", "*.jsx"], // Target only .js and .jsx files
    rules: {
      "no-unused-vars": "warn",
    },
  },
  {
    rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["jest.config.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["**/*.test.js"],
    env: {jest: true},
  },
];

export default eslintConfig;
