import WebpackDevServer from 'webpack-dev-server';

export default function (
  host: string,
  https?: boolean,
  contentBase?: string,
  override?: object,
): WebpackDevServer.Configuration {
  return {
    host,
    https,
    compress: true,
    hot: true,
    contentBase,
    ...override,
  };
}
