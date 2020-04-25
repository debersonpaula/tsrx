import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import loadConfigFile from './utils/loadConfigFile';
import logger from './utils/logger';
import { IScriptCallback } from './utils/IScriptCallback';
import webpackCompiler from './utils/webpackCompiler';

const script: IScriptCallback = (args: string[], basePath: string) => {
  return new Promise<void>((resolve, reject) => {
    // get config filename
    const configFile = args[0];

    // load configutation react data
    const configReactData = loadConfigFile(configFile, basePath);

    // webpack compiler
    const compiler = webpackCompiler(configReactData, basePath, 'production');
    if (!compiler) {
      return reject();
    }

    compiler.run((err, stats) => {
      // check for fatal errors
      if (err) {
        logger(
          chalk.red(
            '===========================================================',
          ),
        );
        logger(chalk.red('FALTAL ERROR: '));
        logger(err.stack || err);
        if (err.message) {
          logger(err.message);
        }
        logger(
          chalk.red(
            '===========================================================',
          ),
        );
        return reject();
      }

      const info = stats.toJson();

      // check for compilation errors
      if (stats.hasErrors()) {
        logger(
          chalk.red(
            '===========================================================',
          ),
        );
        logger(chalk.red('BUILD ERROR: '));
        info.errors.forEach((item) => {
          logger();
          logger(chalk.red(item));
        });
        logger(
          chalk.red(
            '===========================================================',
          ),
        );
        return reject();
      }
      // check for compilation warnings
      if (stats.hasWarnings()) {
        logger(
          chalk.yellow(
            '===========================================================',
          ),
        );
        logger(chalk.yellow('BUILD WARNINGS: '));
        logger(chalk.yellow(info.warnings.toString()));
        logger(
          chalk.yellow(
            '===========================================================',
          ),
        );
      }

      // copy package.json and removes dependencies
      const packageFile = fs.readFileSync(
        path.resolve(basePath, 'package.json'),
      );
      const packageObject = JSON.parse(packageFile.toString());
      packageObject.dependencies = {};
      packageObject.devDependencies = {};
      packageObject.scripts = {};
      fs.writeFileSync(
        path.resolve(basePath, configReactData.outputPath, 'package.json'),
        JSON.stringify(packageObject),
      );

      logger('===========================================================');
      const resultTime = stats.endTime - stats.startTime;
      logger(`BUILD FINISHED IN - ${resultTime / 1000}s`);
      logger('===========================================================');

      resolve();
    });
  });
};

export default script;
