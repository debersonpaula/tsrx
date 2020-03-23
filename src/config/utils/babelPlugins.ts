import { EnvType } from '../interfaces/envType';

export const babelPlugins = (env: EnvType, reactHotLoader: boolean) => {
  return [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    reactHotLoader && 'react-hot-loader/babel',
    env === 'test' && 'transform-es2015-modules-commonjs',
  ].filter(Boolean);
};
