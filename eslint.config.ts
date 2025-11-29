import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js, import: importPlugin, perfectionist },
    extends: [js.configs.recommended, eslintPluginPrettierRecommended],
    languageOptions: { globals: globals.browser },
    rules: {
      'prettier/prettier': 'error',
      'object-curly-spacing': ['error', 'always'],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
          ignoreCase: false,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
          ],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
        },
      ],
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
])
