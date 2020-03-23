import { RuleSetRule } from 'webpack';

/**
 * Exclude `js` files to keep "css" loader working as it injects
 * its runtime that would otherwise be processed through "file" loader.
 * Also exclude `html` and `json` extensions so they get processed
 * by webpacks internal loaders.
 */
export const fileLoader = (): RuleSetRule => ({
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: 'url-loader',
  options: {
    limit: '10000',
    name: 'assets/media/[name].[hash:8].[ext]',
  },
});
