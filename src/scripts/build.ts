import loadConfigFile from './utils/loadConfigFile';
import { IScriptCallback } from './utils/IScriptCallback';
import webpackCompiler from './utils/webpackCompiler';
import webpackRunner from './utils/webpackRunner';

const script: IScriptCallback = (args: string[], basePath: string) => {
  // get config filename
  const configFile = args[0];

  // load configutation react data
  const configReactData = loadConfigFile(configFile);

  // webpack compiler
  const compiler = webpackCompiler(configReactData, basePath, 'production');
  if (!compiler) {
    return Promise.reject();
  }

  return webpackRunner(compiler);
};

export default script;
