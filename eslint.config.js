// ESLint configuration for Angular 19 + TypeScript
// Uses the new flat config format (eslint.config.js) compatible with ESLint >=9
import fs from "fs";
import path from "path";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import angulareslint from "@angular-eslint/eslint-plugin";
import angulartemplateparser from "@angular-eslint/template-parser";
import angulartemplate from "@angular-eslint/eslint-plugin-template";

const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
const hasTsconfig = fs.existsSync(tsconfigPath);

export default [
  // Base: apply to all files
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },

  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: hasTsconfig ? [tsconfigPath] : undefined,
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angulareslint,
    },
    rules: {
      // Recommended rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "prefer-const": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Angular specific (tunable)
      "@angular-eslint/no-empty-lifecycle-method": "warn",
    },
  },

  // Template files
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angulartemplateparser,
    },
    plugins: {
      "@angular-eslint/template": angulartemplate,
    },
    rules: {
      // Add template-specific rules as desired
      "@angular-eslint/template/no-negated-async": "warn",
    },
  },

  // JSON, markdown and others could have separate configs if needed
];
