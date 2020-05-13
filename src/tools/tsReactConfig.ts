import { ITSREXConfig } from './ITSREXConfig';
import defaultConfig from './defaultConfig';
import logger from '../tools/logger';

logger.warning(`
  DEPRECATION WARNING:
  The method tsReactConfigValidator will be deprecated. Use defaultConfig.
  Ex.: require('tsrx/tools/defaultConfig')
`);

export function tsReactConfigValidator(config: ITSREXConfig): ITSREXConfig {
  return defaultConfig(config);
}
