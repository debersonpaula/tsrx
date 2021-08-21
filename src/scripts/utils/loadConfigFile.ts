import fs from 'fs';
import path from 'path';
import { ITSREXConfig } from '../../tools/ITSREXConfig';

/**
 * Load configuration file
 */
export default function loadConfigFile(filename: string): ITSREXConfig {
  const configFileName = path.resolve(process.cwd(), filename);

  if (fs.existsSync(configFileName)) {
    try {
      // return __non_webpack_require__(configFileName);
      return require(configFileName);
    } catch (error) {
      throw new Error(`Can not load "${configFileName}". ${error}`);
    }
  }
  throw new Error(`Configuration file "${configFileName}" does not exists.`);
}
