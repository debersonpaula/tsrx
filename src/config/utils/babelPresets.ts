import { EnvType } from '../interfaces/envType';

export const babelPresets = (env: EnvType) => {
  const isEnvDevelopment = env === 'development';
  const isEnvTest = env === 'test';
  const isEnvProduction = env === 'production';

  return [
    isEnvTest && [
      // ES features necessary for user's Node version
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ].filter(Boolean);
};
