import { RuleSetRule } from 'webpack';

export const imageLoader = (): RuleSetRule => ({
  test: /\.(bmp|png|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
});
