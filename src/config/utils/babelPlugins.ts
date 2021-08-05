import { EnvType } from '../interfaces/envType';

export const babelPlugins = (env: EnvType) => {
  const isEnvDevelopment = env === 'development';

  return [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',

    isEnvDevelopment && 'react-refresh/babel',
  ].filter(Boolean);
};
