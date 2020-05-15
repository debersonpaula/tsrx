'use strict';

var DefaultConfig = require('../../dist/bin/tools').DefaultConfig;

module.exports = DefaultConfig({
  // source of files
  sourcePath: 'sandbox/static',
  // output path
  outputPath: 'dist/sandbox-static',
  // if outputStatic is set with a string
  // will be considered only the js as static
  // and the string will be the name of it
  // html will be not rendered
  outputStatic: 'static.min',
});
