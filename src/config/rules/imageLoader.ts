import { RuleSetRule } from 'webpack';

export const imageLoader = (): RuleSetRule => ({
  test: /\.(bmp|png|jpg|jpeg|gif|webp)$/i,
  type: 'asset/resource',
});
