import { EnvType } from '../interfaces/envType';

export const babelPresets = (env: EnvType) => {
  const isEnvDevelopment = env === 'development';
  const isEnvTest = env === 'test';

  return [
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: isEnvDevelopment || isEnvTest,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
    [
      '@babel/preset-env',
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Do not transform modules to CJS
        modules: false,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
        // To use async / await and avoid
        // error: ReferenceError: regeneratorRuntime is not defined
        targets: {
          node: 'current',
        },
      },
    ],
  ];
};
