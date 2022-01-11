import WebpackDevServer from 'webpack-dev-server';

export default function (
  host: string,
  https?: boolean,
  // contentBase?: string,
  override?: WebpackDevServer.Configuration,
): WebpackDevServer.Configuration {
  return {
    host,
    https,
    compress: true,
    hot: true,
    // contentBase,
    
    ...override,
  };
}
