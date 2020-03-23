import logger from './scripts/utils/logger';
import { IScripts } from './scripts/utils/IScriptCallback';
import scriptStart from './scripts/start';
import scriptBuild from './scripts/build';
import scriptLibrary from './scripts/library';
import scriptTest from './scripts/test';

// Makes the script crash on unhandled rejections
process.on('unhandledRejection', (err) => {
  throw err;
});

const args = process.argv.slice(2);

const scriptName = args[0];
const nodeArgs = args.slice(1);

const scripts: IScripts = {
  start: scriptStart,
  build: scriptBuild,
  library: scriptLibrary,
  test: scriptTest,
};

const scriptHandler = scripts[scriptName];

// RUN script
if (scriptHandler && typeof scriptHandler === 'function') {
  const result = scriptHandler(nodeArgs, process.cwd());

  result
    .then((response) => {
      logger('Loaded script!');
      if (scriptName === 'test' && !response.results.success) {
        process.exit(1);
      }
    })
    .catch((err) => {
      logger(`Script "${scriptName}" executed with error.`);
      logger(err);
      process.exit(1);
    });
} else {
  logger(
    `Script "${scriptName}" does not exists or does not have handle to execute.`,
  );
  process.exit(1);
}
