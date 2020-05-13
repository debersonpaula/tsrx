'use strict';

var trsConfig = require('../../dist/bin/tools/tsReactConfig')
  .tsReactConfigValidator;

module.exports = trsConfig({
  // source of files
  sourcePath: 'sandbox',
  // output path
  outputPath: 'dist/sandbox-build',
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
    ParamObject: { label: 'Label from env', value: 'Value from env' }
  },
  // enable React Hot Loader
  reactHotLoader: true,

  jest: {
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    updateSnapshot: true,
  },

  devServer: {
    open: true,
    hot: true,
  },
});
