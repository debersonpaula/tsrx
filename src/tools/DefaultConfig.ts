import { ITSREXConfig } from './ITSREXConfig';
import logger from './logger';

export function DefaultConfig(config: ITSREXConfig) {
  if (config.htmlEnv) {
    logger.warning(`
  DEPRECATION WARNING:
  The property "htmlEnv" in config is no longer used.
  Use "env" instead.
    `);
  }

  if (config.nodeEnv) {
    logger.warning(`
  USAGE WARNING:
  The property "nodeEnv" in config will be used only for build/debug purposes.
  Use "env" instead.
    `);
  }

  if (!config.configFile && !config.skipConfigFile) {
    logger.warning(`
  ENVIRONMENT WARNING:
  The property "configFile" is not set.
  The validation of environment will not run and the variables will
  be not verified if "env" does not have that variable.
  Consider adding this file.

  TO REMOVE THIS MESSAGE, set option skipConfigFile = true
    `);
  }

  if (config.htmlTemplate) {
    logger.warning(`
  USAGE WARNING:
  This property was removed.
  Use 'publicFolder' instead and points to your
  public folder that contains the html file.
    `);
  }

  const defaultConfig: ITSREXConfig = {
    ...config,
    sourcePath: config.sourcePath || 'src',
    outputPath: config.outputPath || 'dist',
    port: config.port || parseInt(process.env.PORT, 10) || 8080,
    host: config.host || process.env.HOST || 'localhost',
    env: config.env || {},
    overrideLoader: config.overrideLoader || {},
    webpack: config.webpack || function () {},
  };

  return defaultConfig;
}
