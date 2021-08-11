import { RuleSetRule } from 'webpack';

export const svgLoader = (): RuleSetRule => ({
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        svgoConfig: {
          plugins: {
            removeViewBox: false, // added to preserve viewBox on SVG
          },
        },
      },
    },
  ],
});
