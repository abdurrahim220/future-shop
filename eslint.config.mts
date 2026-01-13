import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
export default defineConfig([
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}", "test/**/*.{js,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  tseslint.configs.recommended,
  {
    files: ["test/**/*.{js,ts,jsx,tsx}"],
    plugins: { jest },
    extends: ["jest/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
  eslintPluginPrettierRecommended,
]);
