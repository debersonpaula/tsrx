import webpack = require('webpack');

interface IEnvKeyValues {
  [key: string]: string;
}

interface ITSREXConfigBase {
  source: string;
  sourceFile: string;
  port: number;
  host: string;
  nodeEnv: IEnvKeyValues;
  htmlEnv: IEnvKeyValues;
  outputPath: string;
  library: boolean;
  jest: any;
  outputStatic: string;
  devServer: any;
  reactHotLoader: boolean;

  /**
   * OBSOLETE:
   * use webpack instead
   */
  plugins: any[];

  /**
   * Webpack customization
   * any properties define in this property
   * will override TSREX config
   */
  webpack: webpack.Configuration;
}

export type ITSREXConfig = ITSREXConfigBase;
