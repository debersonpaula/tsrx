import webpack from 'webpack';
import path from 'path';
// import * as cwp from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ExternalTemplateRemotesPlugin from 'external-remotes-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import webpackOutputConfig from './output.config';
import { babelLoader } from './rules/babelLoader';
// import { tsLintLoader } from './rules/tsLintLoader';
import { fileLoader } from './rules/fileLoader';
import { imageLoader } from './rules/imageLoader';
import { styleLoader } from './rules/styleLoader';
import { htmlConfigPlugin } from './plugins/htmlConfigPlugin';
// import { terserConfigPlugin } from './plugins/terserConfigPlugin';
import { ITSREXConfig } from '../tools/ITSREXConfig';
import merge from './helpers/merge';
import { mjsLoader } from './rules/mjsLoader';
import { WebpackMode } from '../tools/interfaces/WebpackMode';

export default function (
  env: WebpackMode,
  basePath: string,
  configReactData: ITSREXConfig,
): webpack.Configuration {
  // Get Enviroment
  const webpackEnv = env === 'development' ? 'development' : 'production';

  // Environment setup
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const isEnvLibrary = configReactData.library;
  const isEnvStatic = configReactData.outputStatic != null;
  const isFederatedModule = !!configReactData.moduleFederationOptions;
  const isExposedModule = env === 'production-expose';

  const sourcePath = path.resolve(basePath, configReactData.sourcePath);
  const sourceFile = configReactData.sourceFile;
  const nodeEnv = {
    isEnvDevelopment: isEnvDevelopment.toString(),
    isEnvProduction: isEnvProduction.toString(),
    NODE_ENV: webpackEnv,
    CONFIG_ENV: JSON.stringify(configReactData.env),
  };

  const config: webpack.Configuration = {
    // ==== GENERAL ==========================================================================
    mode: webpackEnv,
    context: isEnvLibrary ? basePath : undefined,
    // bail: isEnvProduction, // Stop compilation early in production
    // ==== ENTRY ============================================================================
    entry: isExposedModule
      ? [path.join(__dirname, 'tools/samples/blank-project.js')]
      : [
          // isEnvDevelopment && !isFederatedModule && 'react-hot-loader/patch',
          // isEnvDevelopment &&
          //   configReactData.reactHotLoader &&
          //   'react-hot-loader/patch',
          path.join(sourcePath, sourceFile),
        ].filter(Boolean),
    // ==== OUTPUT ===========================================================================
    output: webpackOutputConfig(webpackEnv, basePath, configReactData),
    // ==== MODULE ===========================================================================
    module: {
      // makes missing exports an error instead of warning
      strictExportPresence: true,
      rules: [
        // REPLACE TSLINT TO ESLINT
        // tsLintLoader(sourcePath),

        merge(
          babelLoader(webpackEnv),
          configReactData.overrideLoader.babelLoader,
        ),
        merge(styleLoader(), configReactData.overrideLoader.styleLoader),
        mjsLoader(),
        imageLoader(),
        fileLoader(), // must be the last
      ],
    },
    // ==== RESOLVE ===========================================================================
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(basePath, './tsconfig.json'),
          extensions: ['.ts', '.tsx', '.js'],
        }),
      ],
      alias: {
        process: 'process/browser',
      },
      fallback: {},
    },
    // ==== PLUGINS ===========================================================================
    plugins: [
      // HTML
      !isExposedModule &&
        !isEnvLibrary &&
        !isEnvStatic &&
        htmlConfigPlugin(
          path.join(basePath, configReactData.htmlTemplate),
          { ...configReactData.htmlEnv, ...configReactData.env },
          isEnvProduction,
        ),

      // HOT RELOAD
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new ReactRefreshWebpackPlugin(),
      // NODE ENV
      new webpack.EnvironmentPlugin(nodeEnv),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      // new webpack.DefinePlugin(nodeEnv),
      // CLEARER
      // isEnvProduction &&
      //   new cwp.CleanWebpackPlugin({
      //     dry: false,
      //     verbose: true,
      //     cleanOnceBeforeBuildPatterns: [
      //       path.join(basePath, configReactData.outputPath, '/**/*'),
      //     ],
      //   }),
      // BUNDLE ANALYSER
      isEnvProduction &&
        !isEnvLibrary &&
        !isEnvStatic &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        }),
    ].filter(Boolean),
    // ==== OPTIMIZE ==========================================================================
    optimization: {
      // splitChunks:
      //   isEnvLibrary || isEnvStatic
      //     ? undefined
      //     : {
      //         cacheGroups: {
      //           commons: {
      //             test: /[\\/]node_modules[\\/]/,
      //             name: 'vendor',
      //             chunks: 'all',
      //           },
      //         },
      //       },
      minimize: isEnvProduction,
      // minimizer: [terserConfigPlugin()],
      usedExports: isEnvProduction,
      sideEffects: isEnvProduction,
    },
  };
  // ==== LIBRARY ==========================================================================
  if (isEnvLibrary) {
    config.externals = {
      redux: {
        commonjs: 'redux',
        commonjs2: 'redux',
        amd: 'redux',
        root: 'redux',
      },
      'react-redux': {
        commonjs: 'react-redux',
        commonjs2: 'react-redux',
        amd: 'react-redux',
        root: 'react-redux',
      },
      rxjs: {
        commonjs: 'rxjs',
        commonjs2: 'rxjs',
        amd: 'rxjs',
        root: 'rxjs',
      },
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
    };
  }

  // ==== SOURCEMAP ==========================================================================
  if (isEnvDevelopment) {
    config.devtool = 'cheap-module-source-map';
  }

  // ==== FEDERATED MODULES ==================================================================
  if (isFederatedModule) {
    const moduleFederationConfig = configReactData.moduleFederationOptions;

    config.plugins.push(
      new webpack.container.ModuleFederationPlugin(moduleFederationConfig),
    );

    if (moduleFederationConfig.remotes) {
      config.plugins.push(new ExternalTemplateRemotesPlugin());
    }
  }

  // ==== CUSTOMIZE WEBPACK =============
  configReactData.webpack && configReactData.webpack(config, webpackEnv);

  return config;
}
