/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import js from '@eslint/js';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import react from 'eslint-plugin-react';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import globals from 'globals';

export default [
  {
    ignores: [
      'dist',
      'vite.config.js',
      'eslint.config.js',
      'vitest.setup.js',
      'coverage',
    ],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
