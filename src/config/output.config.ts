import webpack from 'webpack';
import path from 'path';
import { ITSREXConfig } from '../scripts/utils/ITSREXConfig';

export default function(
  webpackEnv: 'production' | 'development',
  basePath: string,
  configReactData: ITSREXConfig,
): webpack.Output {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const isEnvLibrary = configReactData.library;
  const outputPath = path.join(basePath, configReactData.outputPath);

  if (isEnvLibrary) {
    return {
      filename: 'index.js',
      path: outputPath,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    };
  }

  if (configReactData.outputStatic != null) {
    return {
      filename: `${configReactData.outputStatic}.js`,
      path: outputPath,
    };
  }

  return {
    // The build folder.
    path: isEnvProduction ? outputPath : undefined,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isEnvDevelopment,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: isEnvProduction
      ? '[name].[contenthash:8].js'
      : isEnvDevelopment && 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isEnvProduction
      ? '[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && '[name].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isEnvProduction
      ? (info) =>
          path.relative(basePath, info.absoluteResourcePath).replace(/\\/g, '/')
      : isEnvDevelopment &&
        ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
  };
}
