module.exports = {
  root: true,
  extends: [
    '@react-native',
    'prettier'
  ],
  plugins: [
    'import',
    'prettier'
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'prettier/prettier': 'error',

    'no-console': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-unused-styles': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};