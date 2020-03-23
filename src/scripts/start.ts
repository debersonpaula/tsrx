import WebpackDevServer from 'webpack-dev-server';
import loadConfigFile from './utils/loadConfigFile';

import configDevServer from '../config/webpackDevServer.config';
import logger from './utils/logger';
import { IScriptCallback } from './utils/IScriptCallback';
import webpackCompiler from './utils/webpackCompiler';

const script: IScriptCallback = (args: string[], basePath: string) => {
  return new Promise<void>((resolve, reject) => {
    // get config filename
    const configFile = args[0];

    // load configutation react data
    const configReactData = loadConfigFile(configFile);

    // webpack compiler
    const compiler = webpackCompiler(configReactData, basePath, 'development');
    if (!compiler) {
      return reject();
    }

    // create web dev server
    const cfgdev = configDevServer(
      configReactData.host,
      false,
      configReactData.devServer
    );
    const devServer = new WebpackDevServer(compiler, cfgdev);
    const port = configReactData.port;
    const hostname = configReactData.host;

    // start web dev server
    devServer.listen(port, hostname, error => {
      if (error) {
        return reject(error);
      }
      logger('===========================================================');
      logger(`STARTED WEB DEV SERVER ON http://${hostname}:${port}`);
      logger('===========================================================');

      resolve();
    });
  });
};

export default script;
