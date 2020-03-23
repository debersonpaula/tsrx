import { RuleSetRule } from 'webpack';

/**
 * Process application JS with Babel.
 * The preset includes JSX, Flow, TypeScript, and some ESnext features.
 */
export const tsLintLoader = (sourcePath: string): RuleSetRule => ({
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  enforce: 'pre',
  use: [
    {
      loader: 'tslint-loader',
    },
  ],
  include: sourcePath,
});
