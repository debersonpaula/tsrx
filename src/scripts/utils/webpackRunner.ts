import webpack from 'webpack';
import logger from '../../tools/logger';

export default function (compiler: webpack.Compiler, afterBuild?: () => void) {
  return new Promise<void>((resolve, reject) => {
    compiler.run((err, stats) => {
      // check for fatal errors
      if (err) {
        logger.error(
          '===========================================================',
        );
        logger.error('FALTAL ERROR: ');
        logger.warning(err.stack || err);
        if (err.message) {
          logger.warning(err.message);
        }
        logger.error(
          '===========================================================',
        );
        return reject();
      }

      const info = stats.toJson();

      // check for compilation errors
      if (stats.hasErrors()) {
        logger.error(
          '===========================================================',
        );
        logger.error('BUILD ERROR: ');
        info.errors.forEach((item) => {
          logger.information();
          logger.error(item);
        });
        logger.error(
          '===========================================================',
        );
        return reject();
      }
      // check for compilation warnings
      if (stats.hasWarnings()) {
        logger.warning(
          '===========================================================',
        );
        logger.warning('BUILD WARNINGS: ');
        logger.warning(info.warnings.toString());
        logger.warning(
          '===========================================================',
        );
      }

      logger.information(
        '===========================================================',
      );
      const resultTime = stats.endTime - stats.startTime;
      logger.information(`WEBPACK BUILD FINISHED IN - ${resultTime / 1000}s`);
      logger.information(
        '===========================================================',
      );

      if (afterBuild) {
        afterBuild();
      }

      resolve();
    });
  });
}
