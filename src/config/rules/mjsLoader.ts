import { RuleSetRule } from 'webpack';

// TEMPORARY : to solve issue with AWS-AMPLIFY
export const mjsLoader = (): RuleSetRule => ({
  test: /\.m?js/,
  resolve: {
    fullySpecified: false,
  },
});
