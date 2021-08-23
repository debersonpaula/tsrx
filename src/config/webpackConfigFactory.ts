import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExternalTemplateRemotesPlugin from 'external-remotes-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import findForJsFile from './helpers/findForFile';
import webpackOutputConfig from './output.config';
import { ITSREXConfig } from '../tools/ITSREXConfig';
import { WebpackMode } from '../tools/interfaces/WebpackMode';
import { babelLoader } from './rules/babelLoader';
import { fontLoader } from './rules/fontLoader';
import { htmlConfigPlugin } from './plugins/htmlConfigPlugin';
import { imageLoader } from './rules/imageLoader';
import { mjsLoader } from './rules/mjsLoader';
import { styleLoader } from './rules/styleLoader';
import { svgLoader } from './rules/svgLoader';
import { terserConfigPlugin } from './plugins/terserConfigPlugin';

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

  // Source Entry file
  const sourceEntryPoint = sourceFile
    ? path.join(sourcePath, sourceFile)
    : findForJsFile('index', sourcePath);

  // Source HTML File
  const htmlSourceFile = path.join(
    basePath,
    configReactData.publicFolder,
    'index.html',
  );

  const config: webpack.Configuration = {
    // ==== GENERAL ==========================================================================
    mode: webpackEnv,
    context: isEnvLibrary ? basePath : undefined,
    // ==== ENTRY ============================================================================
    entry: isExposedModule
      ? [path.join(__dirname, 'tools/samples/blank-project.js')]
      : sourceEntryPoint,
    // ==== OUTPUT ===========================================================================
    output: webpackOutputConfig(webpackEnv, basePath, configReactData),
    // ==== MODULE ===========================================================================
    module: {
      // makes missing exports an error instead of warning
      strictExportPresence: true,
      rules: [
        configReactData.overrideLoader.babelLoader || babelLoader(webpackEnv),
        configReactData.overrideLoader.styleLoader || styleLoader(),
        mjsLoader(),
        imageLoader(),
        fontLoader(),
        svgLoader(),
      ],
    },
    // ==== RESOLVE ===========================================================================
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [
        configReactData.enablePaths &&
          new TsconfigPathsPlugin({
            configFile: path.resolve(basePath, './tsconfig.json'),
            extensions: ['.ts', '.tsx', '.js'],
          }),
      ].filter(Boolean),
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
          htmlSourceFile,
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

      // COPY PUBLIC FOLDER
      (isEnvProduction || isEnvStatic) &&
        configReactData.publicFolder &&
        new CopyWebpackPlugin({
          patterns: [
            {
              from: configReactData.publicFolder,
              globOptions: {
                ignore: ['**/index.html'],
              },
            },
          ],
        }),
    ].filter(Boolean),
    // ==== OPTIMIZE ==========================================================================
    optimization: {
      minimize: isEnvProduction,
      usedExports: isEnvProduction,
      sideEffects: isEnvProduction,
      minimizer: [terserConfigPlugin()],
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
