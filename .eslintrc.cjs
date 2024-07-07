module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true, },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  settings: {
    "import/resolver": {
      typescript: {},
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic/js', 'prettier', '@tanstack/query'],
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'jsx-quotes': ["error", "prefer-double"],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/consistent-type-imports": [
      'error',
      {
        prefer: 'type-imports'
      }
    ],
    "no-console": ["warn", { "allow": ["warn", "error"]}],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
  },
}
