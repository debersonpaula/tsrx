import WebpackDevServer from 'webpack-dev-server';

export default function(
  host: string,
  https?: boolean,
  override?: object,
): WebpackDevServer.Configuration {
  return {
    host,
    https,
    // Enable gzip compression of generated files.
    compress: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: '/',
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    overlay: false,
    ...override,
  };
}
