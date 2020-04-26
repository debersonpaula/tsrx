'use strict';

var trsConfig = require('../../dist/bin/tools/tsReactConfig')
  .tsReactConfigValidator;

module.exports = trsConfig({
  // source of files
  source: 'sandbox',
  // output path
  outputPath: 'dist/sandbox-lib',
  // all enviroments to be set in process.env
  nodeEnv: {
    comments: 'Comment from Node Enviroments',
    booleanValue: true,
    numericValue: 37
  },
  // library compilation mode
  library: true
});
