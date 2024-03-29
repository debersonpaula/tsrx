import HTMLWebpackPlugin from 'html-webpack-plugin';

export const htmlConfigPlugin = (
  templateFileName: string,
  htmlEnv: { [key: string]: string },
  minify?: boolean,
) => {
  return new HTMLWebpackPlugin(
    Object.assign(
      {},
      {
        template: templateFileName,
        inject: true,
        // use chunks = main to get rid of errors
        // when using HMR + FederationModules
        chunks: ['main'],
        ...htmlEnv,
      },
      minify
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined,
    ),
  );
};
