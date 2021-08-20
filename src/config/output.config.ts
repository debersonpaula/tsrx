import path from 'path';
import { ITSREXConfig } from '../tools/ITSREXConfig';

export default function (
  webpackEnv: 'production' | 'development',
  basePath: string,
  configReactData: ITSREXConfig,
) {
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
      publicPath: 'auto',
    };
  }

  return {
    path: isEnvProduction ? outputPath : undefined,
    filename: '[name].js',
    publicPath: 'auto',
  };
}
