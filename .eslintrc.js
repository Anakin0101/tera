const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  rules: {
	'curly': 'off',
	'no-console': ['error', { 'allow': ['warn'] }],
    'prettier/prettier': ['error', prettierOptions],
    'unused-imports/no-unused-imports': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': 'off',
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '_', varsIgnorePattern: '_' },
    ],
    'react-native/no-inline-styles': 1,
	// '@typescript-eslint/no-explicit-any': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
