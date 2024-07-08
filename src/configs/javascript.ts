import globals from 'globals';
import { pluginAntfu, pluginUnusedImports } from '../plugins';
import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TESTS } from '../globs';
import type { OptionsIsInEditor, OptionsOverrides, TypedFlatConfigItem } from '../types';

export async function javascript(
  options: OptionsIsInEditor & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    isInEditor = false,
    overrides = {},
  } = options;

  const customRules: TypedFlatConfigItem['rules'] = {
    'arrow-body-style': ['error', 'as-needed'],
    'max-lines': ['error', { max: 400 }],
  };

  return [
    {
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      name: 'rotki/javascript/setup',
    },
    {
      name: 'rotki/javascript/rules',
      plugins: {
        'antfu': pluginAntfu,
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],

        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'constructor-super': 'error',
        'default-case-last': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        'eqeqeq': ['error', 'smart'],
        'for-direction': 'error',
        'getter-return': 'error',
        'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
        'no-alert': 'error',
        // 'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-const-assign': 'error',
        'no-constant-condition': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-implied-eval': 'error',
        'no-import-assign': 'error',
        'no-inner-declarations': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 'error',
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-obj-calls': 'error',
        'no-object-constructor': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-regex-spaces': 'error',
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
        ],
        'no-restricted-properties': [
          'error',
          { message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.', property: '__proto__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupGetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupSetter__' },
        ],
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],
        'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-setter-return': 'error',
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unsafe-optional-chaining': 'error',
        'no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],
        'no-unused-labels': 'error',
        'no-unused-vars': ['error', {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        }],
        'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'no-useless-backreference': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'no-with': 'error',
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'one-var': ['error', { initialized: 'never' }],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'require-await': 'warn',
        'require-yield': 'error',
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],

        'symbol-description': 'error',
        'unicode-bom': ['error', 'never'],
        'unused-imports/no-unused-imports': isInEditor ? 'off' : 'error',

        'unused-imports/no-unused-vars': [
          'error',
          { args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true, vars: 'all', varsIgnorePattern: '^_' },
        ],
        'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'vars-on-top': 'error',
        'yoda': ['error', 'never'],

        ...customRules,
        ...overrides,
      },
    },
    {
      files: [`**/scripts/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      name: 'rotki/javascript/disables/cli',
      rules: {
        'max-lines': 'off',
        'no-console': 'off',
      },
    },
    {
      files: [...GLOB_TESTS],
      name: 'rotki/javascript/disables/tests',
      rules: {
        'max-lines': 'off',
        'no-unused-expressions': 'off',
      },
    },
  ];
};
