import { EnvType } from '../interfaces/envType';

export const babelPlugins = (env: EnvType, reactHotLoader: boolean) => {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';

  return [
    // '@babel/plugin-transform-runtime',
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-numeric-separator',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        // By default, babel assumes babel/runtime version 7.0.0-beta.0,
        // explicitly resolving to match the provided helper functions.
        // https://github.com/babel/babel/issues/10261
        // version: require('@babel/runtime/package.json').version,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules: isEnvDevelopment || isEnvProduction,
        // Undocumented option that lets us encapsulate our runtime, ensuring
        // the correct version is used
        // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
        absoluteRuntime: '@babel/runtime/package.json',
      },
    ],
    reactHotLoader && 'react-hot-loader/babel',
  ].filter(Boolean);
};
