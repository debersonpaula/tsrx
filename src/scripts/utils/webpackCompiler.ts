import webpack from 'webpack';
import logger from '../../tools/logger';
import configWebpack from '../../config/webpackConfigFactory';
import { ITSREXConfig } from '../../tools/ITSREXConfig';

export default function (
  configReactData: ITSREXConfig,
  basePath: string,
  webpackEnv: 'production' | 'development',
): webpack.Compiler {
  // webpack config
  const config = configWebpack(webpackEnv, basePath, configReactData);

  // create compiler
  let compiler: webpack.Compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    logger.error('===========================================================');
    logger.error('COMPILATION ERROR: ');
    logger.error(err.message || err);
    logger.error('===========================================================');
    return undefined;
  }

  return compiler;
}
