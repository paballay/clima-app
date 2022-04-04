const onCommit = process.env.REACT_APP_ON_COMMIT ? 2 : 1;

module.exports = {
    env: {
      browser: true,
      es6: true,
      es2021: true,
    },
    extends: [
      'react-app',
      'eslint:recommended',
      'plugin:react/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      'react-hooks/exhaustive-deps': 0,
      'react/prop-types': 0,
      'no-debugger': onCommit,
      'no-console': onCommit,
      'prefer-const': 1,
      'no-unused-vars': 0,
    },
  };
