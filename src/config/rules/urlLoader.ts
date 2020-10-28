import { RuleSetRule } from 'webpack';

/**
 * "url" loader works like "file" loader except that it embeds assets
 * smaller than specified limit in bytes as data URLs to avoid requests.
 * A missing `test` is equivalent to a match.
 */
export const urlLoader = (): RuleSetRule => ({
  exclude: [/\.html$/, /\.jsx?$/, /\.js?$/, /\.mjs?$/, /\.tsx?$/, /\.ts?$/, /\.css$/],
  loader: 'url-loader',
  options: {
    limit: '10000',
    name: 'assets/media/[name].[hash:8].[ext]',
  },
});
