// tslint:disable: no-eval
import webpack from 'webpack';
import path from 'path';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { ITSREXConfig } from '../scripts/utils/ITSREXConfig';
import webpackOutputConfig from './output.config';
import { babelLoader } from './rules/babelLoader';
import { tsLintLoader } from './rules/tsLintLoader';
import { urlLoader } from './rules/urlLoader';
import { fileLoader } from './rules/fileLoader';
import { styleLoader } from './rules/styleLoader';
import { htmlConfigPlugin } from './plugins/htmlConfigPlugin';
import { terserConfigPlugin } from './plugins/terserConfigPlugin';

export default function(
  webpackEnv: 'production' | 'development',
  basePath: string,
  configReactData: ITSREXConfig,
): webpack.Configuration {
  // Environment setup
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const isEnvLibrary = configReactData.library;
  const isEnvStatic = configReactData.outputStatic != null;

  const sourcePath = path.resolve(basePath, configReactData.source);
  const sourceFile = configReactData.sourceFile;
  const nodeEnv = {
    isEnvDevelopment: isEnvDevelopment.toString(),
    isEnvProduction: isEnvProduction.toString(),
    NODE_ENV: webpackEnv,
    ...configReactData.nodeEnv,
  };

  const config: webpack.Configuration = {
    // ==== GENERAL ==========================================================================
    mode: webpackEnv,
    context: isEnvLibrary ? basePath : undefined,
    bail: isEnvProduction, // Stop compilation early in production
    // ==== ENTRY ============================================================================
    entry: [
      isEnvDevelopment &&
        `webpack-dev-server/client?http://${configReactData.host}:${configReactData.port}`,
      isEnvDevelopment && 'webpack/hot/dev-server',
      path.join(sourcePath, sourceFile || 'index.tsx'),
    ].filter(Boolean),
    // ==== OUTPUT ===========================================================================
    output: webpackOutputConfig(webpackEnv, basePath, configReactData),
    // ==== MODULE ===========================================================================
    module: {
      // makes missing exports an error instead of warning
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        tsLintLoader(sourcePath),
        {
          oneOf: [
            urlLoader(),
            babelLoader(webpackEnv, configReactData.reactHotLoader),
            styleLoader(),
            fileLoader(),
          ],
        },
      ],
    },
    // ==== RESOLVE ===========================================================================
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsConfigPathsPlugin()],
      alias: configReactData.reactHotLoader
        ? {
            'react-dom': '@hot-loader/react-dom',
          }
        : {},
    },
    // ==== PLUGINS ===========================================================================
    plugins: [
      // HTML
      !isEnvLibrary &&
        !isEnvStatic &&
        htmlConfigPlugin(
          path.join(sourcePath, 'index.html'),
          configReactData.htmlEnv,
          isEnvProduction,
        ),

      // HOT RELOAD
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      // NODE ENV
      new webpack.EnvironmentPlugin(nodeEnv),
      // CLEARER
      isEnvProduction &&
        new CleanWebpackPlugin({
          dry: false,
          verbose: true,
          cleanOnceBeforeBuildPatterns: [
            path.join(basePath, configReactData.outputPath, '/**/*'),
          ],
        }),
      // BUNDLE ANALYSER
      isEnvProduction &&
        !isEnvLibrary &&
        !isEnvStatic &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        }),
      ...configReactData.plugins,
    ].filter(Boolean),
    // ==== OPTIMIZE ==========================================================================
    optimization: {
      splitChunks:
        isEnvLibrary || isEnvStatic
          ? undefined
          : {
              cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendor',
                  chunks: 'all',
                },
              },
            },
      minimize: isEnvProduction,
      minimizer: [terserConfigPlugin()],
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

  return Object.assign({}, config, configReactData.webpack);
}
