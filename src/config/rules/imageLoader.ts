import { RuleSetRule } from 'webpack';

export const imageLoader = (): RuleSetRule => ({
  test: /\.(bmp|png|jpg|jpeg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
  ],
});
