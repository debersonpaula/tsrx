import { RuleSetRule } from 'webpack';

export const fileLoader = (): RuleSetRule => ({
  loader: 'file-loader',
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.css$/, /\.html$/, /\.json$/],
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
});
