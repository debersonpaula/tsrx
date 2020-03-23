import babelJest from 'babel-jest';

module.exports = babelJest.createTransformer({
  babelrc: false,
  configFile: false,
  presets: ['@babel/preset-env'],
});
