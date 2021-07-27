import { EnvType } from '../interfaces/envType';

export const babelPlugins = (env: EnvType) => {
  const isEnvDevelopment = env === 'development';

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
    isEnvDevelopment && 'react-refresh/babel',
  ].filter(Boolean);
};
