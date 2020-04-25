import webpack from 'webpack';
import chalk from 'chalk';
import logger from './logger';
import configWebpack from '../../config/webpackConfigFactory';
import { ITSREXConfig } from '../../tools/ITSREXConfig';

export default function(
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
    logger(
      chalk.red('==========================================================='),
    );
    logger(chalk.red('COMPILATION ERROR: '));
    logger(chalk.red(err.message || err));
    logger(
      chalk.red('==========================================================='),
    );
    return undefined;
  }

  return compiler;
}
