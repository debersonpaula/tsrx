import type { Config } from '@jest/types';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevConfiguration } from 'webpack-dev-server';

export interface IEnvKeyValues {
  [key: string]: string;
}

export interface ITSREXConfigBase {
  /**
   * Source path of application files
   */
  sourcePath: string;

  /**
   * Source index file of the app
   * default = index.tsx
   */
  sourceFile: string;

  /**
   * Indicate the html template to run with application
   * default = index.html
   */
  htmlTemplate: string;

  /**
   * port to be used in development
   * will be set in webpack-dev-server
   */
  port: number;

  /**
   * hostname to be used in development
   * will be set in webpack-dev-server
   */
  host: string;

  /**
   * object with
   * process.env
   *
   * @deprecated
   * The property "htmlEnv" in config will be deprecated and removed.
   * Use "env" instead and adopt new config system
   */
  nodeEnv: IEnvKeyValues;

  /**
   * all enviroments to be set in HTMLWebpackPlugin
   * available in HTML thru <%= htmlWebpackPlugin.options.propertyName
   *
   * @deprecated
   * The property "nodeEnv" in config will be deprecated and removed.
   * Use "env" instead.
   */
  htmlEnv: IEnvKeyValues;

  /**
   * object with all enviroments to be set in
   *  - node: thru process.env
   *  - html: thru <%= htmlWebpackPlugin.options.propertyName %>
   */
  env: IEnvKeyValues;

  /**
   * output path for the compiled bundle
   */
  outputPath: string;

  /**
   * trigger the flag to make project to be built as library
   */
  library: boolean;

  /**
   * Trigger the flag to make project to be built as unique bundle.
   *
   * To be used as static file for WebComponent for example
   */
  outputStatic: string;

  /**
   * Indicate to use react-hot-loader plugin
   */
  reactHotLoader: boolean;

  /**
   * Jest Test Customization
   */
  jest: Config.Argv;

  /**
   * Webpack Dev Server Customization
   */
  devServer: WebpackDevConfiguration;

  /**
   * Webpack customization
   * any properties define in this property
   * will override TSREX config
   */
  webpack: WebpackConfiguration;
}

export type ITSREXConfig = Partial<ITSREXConfigBase>;
