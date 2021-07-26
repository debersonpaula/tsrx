import { EnvType } from '../interfaces/envType';

export const babelPlugins = (env: EnvType, reactHotLoader: boolean) => {
  const isEnvDevelopment = env === 'development';
  // const isEnvProduction = env === 'production';
  // const isEnvTest = env === 'test';

  return [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-named-asset-import',
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
          },
        },
      },
    ],
    isEnvDevelopment && reactHotLoader && 'react-hot-loader/babel',
  ].filter(Boolean);
};
