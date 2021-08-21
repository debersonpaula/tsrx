'use strict';

var DefaultConfig = require('../../dist/bin/tools').DefaultConfig;

module.exports = DefaultConfig({
  // source of files
  sourcePath: 'sandbox',
  // output path
  outputPath: 'dist/sandbox-lib',
  // all enviroments to be set in process.env
  nodeEnv: {
    comments: 'Comment from Node Enviroments',
    booleanValue: true,
    numericValue: 37
  },
  // library compilation mode
  library: true,
  enablePaths: true,
});
