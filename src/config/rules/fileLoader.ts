import { RuleSetRule } from 'webpack';

export const fileLoader = (): RuleSetRule => ({
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
});
