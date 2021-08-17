'use strict';

// For debug purpose only
process.env.DEBUG_OVERRIDE_TSRX_SOURCE = './';

// Inject paths inside the test
const tsconfig = require(require('path').resolve(
  process.cwd(),
  'tsconfig.json',
));
const paths = tsconfig.compilerOptions.paths;
const moduleNameMapper = {};
for (var key in paths) {
  moduleNameMapper[key.replace('*', '(.*)')] =
    '<rootDir>/' + paths[key][0].replace('*', '$1');
}

var DefaultConfig = require('../../dist/bin/tools').DefaultConfig;

module.exports = DefaultConfig({
  // source of files
  sourcePath: 'sandbox',
  // output path
  outputPath: 'dist/sandbox-build',
  // index.html template
  htmlTemplate: 'sandbox/index.html',
  // port
  port: 8080,
  // hostname
  host: 'localhost',
  // all enviroments config
  env: {
    ParamNumber: 7,
    ParamAny: 'Any config from env',
    ParamText: 'Text from env',
    ParamBoolean1: false,
    ParamBoolean2: true,
    ParamObject: { label: 'Label from env', value: 'Value from env' },
  },

  jest: {
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    moduleNameMapper,
    updateSnapshot: true,
  },

  devServer: {
    open: true,
    hot: true,
  },

  skipConfigFile: false,

  configFile: 'samples/Config.ts',
});
