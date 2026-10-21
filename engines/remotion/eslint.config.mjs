import { config } from "@remotion/eslint-config-flat";

export default [
  ...config,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "@remotion/non-pure-animation": "warn"
    }
  }
];
