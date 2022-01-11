import WebpackDevServer from 'webpack-dev-server';
import loadConfigFile from './utils/loadConfigFile';
import configDevServer from '../config/webpackDevServer.config';
import { IScriptCallback } from './utils/IScriptCallback';
import webpackCompiler from './utils/webpackCompiler';
import webpackConfigFactory from '../config/webpackConfigFactory';

const script: IScriptCallback = (args: string[], basePath: string) => {
  return new Promise<void>((resolve, reject) => {
    // get config filename
    const configFile = args[0];

    // load configutation react data
    const configReactData = loadConfigFile(configFile);

    // webpack config
    const config = webpackConfigFactory(
      'development',
      basePath,
      configReactData,
    );

    // webpack compiler
    const compiler = webpackCompiler(config);

    if (!compiler) {
      return reject();
    }

    // create web dev server
    const cfgdev = configDevServer(
      configReactData.host,
      false,
      // configReactData.publicFolder,
      configReactData.devServer,
    );
    // WebpackDevServer.addDevServerEntrypoints(config, cfgdev);
    const devServer = new WebpackDevServer(cfgdev, compiler);
    const port = configReactData.port;
    const hostname = configReactData.host;

    // start web dev server
    // devServer.start(port, hostname, (error: any) => {
    //   if (error) {
    //     return reject(error);
    //   }
    //   resolve();
    // });
    devServer.start().then(resolve).catch(reject);
  });
};

export default script;
