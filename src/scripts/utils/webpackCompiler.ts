import webpack from 'webpack';
import logger from '../../tools/logger';

export default function (config: webpack.Configuration): webpack.Compiler {
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
