import { RuleSetRule } from 'webpack';

export const fileLoader = (): RuleSetRule => ({
  loader: 'file-loader',
  exclude: [
    /\.(js|mjs|jsx|ts|tsx)$/,
    /\.(bmp|png|jpg|jpeg|gif)$/i,
    /\.css$/,
    /\.html$/,
    /\.json$/,
  ],
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
});
