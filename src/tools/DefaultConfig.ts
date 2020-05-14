import { ITSREXConfig } from './ITSREXConfig';
import logger from './logger';

export function DefaultConfig(config: ITSREXConfig) {
  if (!config.sourcePath) {
    throw new Error('ERROR: SourcePath not provided in the config file');
  }

  if (config.htmlEnv) {
    logger.warning(`
  DEPRECATION WARNING:
  The property "htmlEnv" in config will be deprecated and removed.
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

  const defaultConfig: ITSREXConfig = {
    ...config,
    sourceFile: config.sourceFile || 'index.tsx',
    htmlTemplate: config.htmlTemplate || 'index.html',
    port: config.port || parseInt(process.env.PORT, 10) || 8080,
    host: config.host || process.env.HOST || 'localhost',
    env: config.env || {},
    webpack: config.webpack || {},
  };

  return defaultConfig;
}
