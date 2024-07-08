import type { VendoredPrettierOptions } from './vendor/prettier';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { ParserOptions } from '@typescript-eslint/parser';
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks';
import type { Linter } from 'eslint';
import type {
  RuleConfig,
} from '@antfu/eslint-define-config';
import type { ConfigNames, RuleOptions } from './typegen';
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';

export type WrapRuleConfig<T extends { [key: string]: any }> = {
  [K in keyof T]: T[K] extends RuleConfig ? T[K] : RuleConfig<T[K]>
};

export type Awaitable<T> = T | Promise<T>;

export type Rules = RuleOptions;

export type { ConfigNames };

export type TypedFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord & Rules>, 'plugins'> & {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
};

export type OptionsTypescript =
  (OptionsTypeScriptWithTypes & OptionsOverrides)
  | (OptionsTypeScriptParserOptions & OptionsOverrides);

export interface OptionsFormatters {
  /**
     * Enable formatting support for CSS, Less, Sass, and SCSS.
     *
     * Currently only support Prettier.
     */
  css?: 'prettier' | boolean;

  /**
     * Enable formatting support for HTML.
     *
     * Currently only support Prettier.
     */
  html?: 'prettier' | boolean;

  /**
   * Enable formatting support for XML.
   *
   * Currently only support Prettier.
   */
  xml?: 'prettier' | boolean;

  /**
     * Enable formatting support for Markdown.
     *
     * Support both Prettier and dprint.
     *
     * When set to `true`, it will use Prettier.
     */
  markdown?: 'prettier' | 'dprint' | boolean;

  /**
     * Custom options for Prettier.
     *
     * By default it's controlled by our own config.
     */
  prettierOptions?: VendoredPrettierOptions;

  /**
     * Custom options for dprint.
     *
     * By default it's controlled by our own config.
     */
  dprintOptions?: boolean;
}

export interface OptionsFiles {
  /**
     * Override the `files` option to provide custom globs.
     */
  files?: string[];
}

export interface OptionsVue extends OptionsOverrides {
  /**
     * Create virtual files for Vue SFC blocks to enable linting.
     *
     * @see https://github.com/antfu/eslint-processor-vue-blocks
     * @default true
     */
  sfcBlocks?: boolean | VueBlocksOptions;

  /**
     * Vue version. Apply different rules set from `eslint-plugin-vue`.
     *
     * @default 3
     */
  vueVersion?: 2 | 3;
}

export interface OptionsCypress extends OptionsOverrides {
  testDirectory?: string;
}

export interface OptionsVueI18n extends OptionsOverrides {

  /**
   * The source directory where of the project where vue-i18n is setup.
   */
  src?: string;
  /**
   * The locales directory under the source directory
   *
   * @default locales
   */
  localesDirectory?: string;
  /**
   * Patterns that will be ignored by @intlify/vue-i18n/no-unused-keys.
   */
  ignores?: string[];
  /**
   * Vue18n version. Apply different rules set from `@intlify/vue-i18n`.
   *
   * @default 9
   */
  version?: 8 | 9;
}

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules'];
}

export interface OptionsRegExp {
  /**
   * Override rulelevels
   */
  level?: 'error' | 'warn';
}

export interface OptionsComponentExts {
  /**
     * Additional extensions for components.
     *
     * @example ['vue']
     * @default []
     */
  componentExts?: string[];
}

export interface OptionsTypeScriptParserOptions {
  /**
     * Additional parser options for TypeScript.
     */
  parserOptions?: Partial<ParserOptions>;

  /**
     * Glob patterns for files that should be type aware.
     * @default ['**\/*.{ts,tsx}']
     */
  filesTypeAware?: string[];

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[];
}

export interface OptionsTypeScriptWithTypes {
  /**
     * When this options is provided, type aware rules will be enabled.
     * @see https://typescript-eslint.io/linting/typed-linting/
     */
  tsconfigPath?: string | string[];
}

export interface OptionsHasTypeScript {
  typescript?: boolean;
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig;
}

export interface StylisticConfig extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {
}

export interface OptionsIsInEditor {
  isInEditor?: boolean;
}

export interface OptionsConfig extends OptionsComponentExts {
  /**
     * Enable gitignore support.
     *
     * Passing an object to configure the options.
     *
     * @see https://github.com/antfu/eslint-config-flat-gitignore
     * @default true
     */
  gitignore?: boolean | FlatGitignoreOptions;

  /**
   * Disable some opinionated rules to Anthony's preference.
   *
   * Including:
   * - `antfu/top-level-function`
   * - `antfu/if-newline`
   *
   * @default false
   */
  lessOpinionated?: boolean;

  /**
     * Core rules. Can't be disabled.
     */
  javascript?: OptionsOverrides;

  /**
     * Enable TypeScript support.
     *
     * Passing an object to enable TypeScript Language Server support.
     *
     * @default auto-detect based on the dependencies
     */
  typescript?: boolean | OptionsTypescript;

  /**
     * Enable JSX related rules.
     *
     * Currently only stylistic rules are included.
     *
     * @default true
     */
  jsx?: boolean;

  /**
     * Enable test support.
     *
     * @default true
     */
  test?: boolean | OptionsOverrides;

  /**
     * Enable Vue support.
     *
     * @default auto-detect based on the dependencies
     */
  vue?: boolean | OptionsVue;

  /**
     * Enable JSONC support.
     *
     * @default true
     */
  jsonc?: boolean | OptionsOverrides;

  /**
     * Enable YAML support.
     *
     * @default true
     */
  yaml?: boolean | OptionsOverrides;

  /**
     * Enable linting for **code snippets** in Markdown.
     *
     * For formatting Markdown content, enable also `formatters.markdown`.
     *
     * @default true
     */
  markdown?: boolean | OptionsOverrides;

  /**
     * Enable stylistic rules.
     *
     * @see https://eslint.style/
     * @default true
     */
  stylistic?: boolean | StylisticConfig;

  /**
   * Enable regexp rules.
   *
   * @see https://ota-meshi.github.io/eslint-plugin-regexp/
   * @default true
   */
  regexp?: boolean | (OptionsRegExp & OptionsOverrides);

  /**
     * Use external formatters to format files.
     *
     * Requires installing:
     * - `eslint-plugin-format`
     *
     * When set to `true`, it will enable all formatters.
     *
     * @default false
     */
  formatters?: boolean | OptionsFormatters;

  /**
   * Enable cypress test linting
   * Requires installing:
   * - `eslint-plugin-cypress`
   *
   * When set to `true` it will run on the whole project
   *
   * @default false
   */
  cypress?: boolean | OptionsCypress;

  /**
   * Enable rotki linting
   * Requires installing:
   * - `@rotki/eslint-plugin`
   *
   *
   * @default false
   */
  rotki?: boolean;

  /**
   * Enable vue-i18n linting support.
   * Requires installing:
   * - `@intlify/eslint-plugin-vue-i18n`
   *
   *
   * @default false
   */
  vueI18n?: boolean | OptionsVueI18n;

  /**
   * Enable storybook linting support
   *
   * Requires installing
   * - `eslint-plugin-storybook
   *
   */
  storybook?: boolean | OptionsOverrides;

  /**
     * Control to disable some rules in editors.
     * @default auto-detect based on the process.env
     */
  isInEditor?: boolean;

  /**
   * Automatically rename plugins in the config.
   *
   * @default true
   */
  autoRenamePlugins?: boolean;
}
