import fs from 'fs';
import path from 'path';

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

  return webpackRunner(compiler, () => {
    // copy package.json and removes dependencies
    const packageFile = fs.readFileSync(path.resolve(basePath, 'package.json'));
    const packageObject = JSON.parse(packageFile.toString());
    packageObject.dependencies = {};
    packageObject.devDependencies = {};
    packageObject.scripts = {};
    fs.writeFileSync(
      path.resolve(basePath, configReactData.outputPath, 'package.json'),
      JSON.stringify(packageObject),
    );
  });
};

export default script;
