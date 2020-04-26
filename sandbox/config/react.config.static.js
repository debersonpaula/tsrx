'use strict';

var trsConfig = require('../../dist/bin/tools/tsReactConfig')
  .tsReactConfigValidator;

module.exports = trsConfig({
  // source of files
  source: 'sandbox/static',
  // output path
  outputPath: 'dist/sandbox-static',
  // if outputStatic is set with a string
  // will be considered only the js as static
  // and the string will be the name of it
  // html will be not rendered
  outputStatic: 'static.min',
});
