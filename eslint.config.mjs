// eslint.config.mjs
import globals from 'globals';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prefer-const': 'error', // Enforce using const
      'no-var': 'error', // Disallow var
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'no-undef': 'error', // Disallow undefined variables
      'prettier/prettier': ['error', { endOfLine: 'lf' }, { 'singleQuote': true }],
    },
    ignores: ['node_modules', 'dist'],
  },
];
