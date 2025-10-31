// eslint.config.mjs
import js from "@eslint/js";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import * as parser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: { project: "./tsconfig.json" },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@next/next": nextPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
