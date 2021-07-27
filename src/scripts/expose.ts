import path from 'path';
import loadConfigFile from './utils/loadConfigFile';
import { IScriptCallback } from './utils/IScriptCallback';
import webpackCompiler from './utils/webpackCompiler';
import webpackRunner from './utils/webpackRunner';
import envConfigValidator from './utils/envConfigValidator';
import webpackConfigFactory from '../config/webpackConfigFactory';

const script: IScriptCallback = (args: string[], basePath: string) => {
  // get config filename
  const configFile = args[0];

  // load configutation react data
  const configReactData = loadConfigFile(configFile);

  // webpack config
  const config = webpackConfigFactory(
    'production-expose',
    basePath,
    configReactData,
  );

  // webpack compiler
  const compiler = webpackCompiler(config);

  if (!compiler) {
    return Promise.reject();
  }

  // validates the config file
  process.env.CONFIG_ENV = JSON.stringify(configReactData.env);
  if (configReactData.configFile && !configReactData.skipConfigFile) {
    envConfigValidator(
      path.join(
        basePath,
        configReactData.sourcePath,
        configReactData.configFile,
      ),
      configReactData.env,
    );
  }

  return webpackRunner(compiler);
};

export default script;
