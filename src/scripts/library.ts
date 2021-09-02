import fs from 'fs';
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
  configReactData.library = true;

  // webpack config
  const config = webpackConfigFactory('production', basePath, configReactData);

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

  return webpackRunner(compiler, () => {
    // copy package.json and removes dependencies
    const packageFile = fs.readFileSync(path.resolve(basePath, 'package.json'));
    const packageObject = JSON.parse(packageFile.toString());

    if (!configReactData.libraryDependencies) {
      packageObject.dependencies = {};
    }

    if (!configReactData.libraryDevDependencies) {
      packageObject.devDependencies = {};
    }

    packageObject.scripts = {};
    fs.writeFileSync(
      path.resolve(basePath, configReactData.outputPath, 'package.json'),
      JSON.stringify(packageObject),
    );
  });
};

export default script;
