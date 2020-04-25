import { ITSREXConfig } from './ITSREXConfig';

export function tsReactConfigValidator(config: Partial<ITSREXConfig>): ITSREXConfig {
  return {
    source: config.source,
    sourceFile: config.sourceFile,
    port: config.port || parseInt(process.env.PORT, 10) || 8080,
    host: config.host || process.env.HOST || '0.0.0.0',
    nodeEnv: config.nodeEnv,
    htmlEnv: config.htmlEnv,
    outputPath: config.outputPath,
    library: config.library,
    jest: config.jest,
    outputStatic: config.outputStatic,
    devServer: config.devServer,
    reactHotLoader: config.reactHotLoader,
    webpack: config.webpack || {},
  };
}
