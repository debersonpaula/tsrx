import { RuleSetRule } from 'webpack';

export const styleLoader = (): RuleSetRule => ({
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
});
