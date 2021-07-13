import { babelPresets } from '../utils/babelPresets';
import { EnvType } from '../interfaces/envType';
import { RuleSetRule } from 'webpack';
import { babelPlugins } from '../utils/babelPlugins';

export const babelLoader = (
  env: EnvType,
  reactHotLoader: boolean,
): RuleSetRule => ({
  test: /\.(ts|tsx|js|mjs|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    babelrc: false,
    configFile: false,
    presets: babelPresets(env),
    plugins: babelPlugins(env, reactHotLoader),
  },
});
