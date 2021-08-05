import { RuleSetRule } from 'webpack';

export const svgLoader = (): RuleSetRule => ({
  test: /\.svg$/,
  use: ['@svgr/webpack'],
});
