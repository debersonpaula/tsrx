import loadConfigFile from './utils/loadConfigFile';
import * as jest from 'jest';
import deepmerge from 'deepmerge';
import { IScriptCallback } from './utils/IScriptCallback';
import jestBaseConfig from '../config/jestBaseConfig';

const script: IScriptCallback = (args: string[], basePath: string) => {
  // get config filename
  const configFile = args[0];

  // load configutation react data
  const configReactData = loadConfigFile(configFile);

  // load jest config
  const jestBaseOptions = jestBaseConfig(configReactData.sourcePath);

  // ignore base testMatch if the config have at least one match
  if (configReactData.jest.testMatch) {
    jestBaseOptions.testMatch = [];
  }

  const jestOptions: any = configReactData.jest
    ? deepmerge(jestBaseOptions, configReactData.jest)
    : jestBaseOptions;

  // stringify the modules to be accepted in jest run cli
  jestOptions.moduleNameMapper = JSON.stringify(jestOptions.moduleNameMapper);

  // define CONFIG_ENV before tests
  process.env.CONFIG_ENV = JSON.stringify(configReactData.env);

  // run tests
  return jest.runCLI(jestOptions, [basePath]);
};

export default script;
