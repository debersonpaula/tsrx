import { ITSREXConfig } from './ITSREXConfig';
import logger from './logger';

export default function (config: ITSREXConfig) {
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
  DEPRECATION WARNING:
  The property "nodeEnv" in config will be deprecated and removed.
  Use "env" instead.
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
