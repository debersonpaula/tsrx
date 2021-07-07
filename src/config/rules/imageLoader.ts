import { RuleSetRule } from 'webpack';

export const imageLoader = (): RuleSetRule => ({
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: 'url-loader',
  options: {
    limit: '10000',
    name: 'static/media/[name].[hash:8].[ext]',
  },
});
