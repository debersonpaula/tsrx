import { RuleSetRule } from 'webpack';

/**
 * "url" loader works like "file" loader except that it embeds assets
 * smaller than specified limit in bytes as data URLs to avoid requests.
 * A missing `test` is equivalent to a match.
 */
export const styleLoader = (): RuleSetRule => ({
  test: /\.css$/,
  loader: 'style-loader!css-loader',
});
