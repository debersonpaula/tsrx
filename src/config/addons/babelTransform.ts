import babelJest from 'babel-jest';
import { babelPresets } from '../utils/babelPresets';
import { babelPlugins } from '../utils/babelPlugins';

module.exports = babelJest.createTransformer({
  babelrc: false,
  configFile: false,
  presets: babelPresets('test'),
  plugins: babelPlugins('test', false),
});
