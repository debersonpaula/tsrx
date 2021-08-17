import type { Config } from '@jest/types';
import { Configuration as WebpackConfiguration, RuleSetRule } from 'webpack';
import { ModuleFederationPluginOptions } from './interfaces/ModuleFederationPluginOptions';
import { WebpackMode } from './interfaces/WebpackMode';
// import { Configuration as WebpackDevConfiguration } from 'webpack-dev-server';

export interface IEnvKeyValues {
  [key: string]: string;
}

export interface ITSREXConfigBase {
  /**
   * Source path of application files
   * Default = src
   */
  sourcePath: string;

  /**
   * Source index file of the app
   * default = index.tsx
   */
  sourceFile: string;

  /**
   * Indicate the html template to run with application
   * default = src/index.html
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
   * The property "htmlEnv" in config was removed.
   * Use "env" instead and adopt new config system
   */
  nodeEnv: IEnvKeyValues;

  /**
   * all enviroments to be set in HTMLWebpackPlugin
   * available in HTML thru <%= htmlWebpackPlugin.options.propertyName
   *
   * @deprecated
   * The property "nodeEnv" in config was removed.
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
   * Include dependencies in the library package
   */
  libraryDependencies: boolean;

  /**
   * Include dev dependencies in the library package
   */
  libraryDevDependencies: boolean;

  /**
   * Trigger the flag to make project to be built as unique bundle.
   *
   * To be used as static file for WebComponent for example
   */
  outputStatic: string;

  /**
   * Jest Test Customization
   */
  jest: Config.Argv;

  /**
   * Webpack Dev Server Customization
   */
  devServer: any; // TODO: define type

  /**
   * Webpack customization
   * any properties define in this property
   * will override TSREX config
   */
  webpack: (config: WebpackConfiguration, env: WebpackMode) => void;

  /**
   * specify de Config file
   * created by EnvironmentConfigurator to be validate against
   * environment variables specified in "env"
   */
  configFile: string;

  /**
   * ignore the config file validation
   */
  skipConfigFile: boolean;

  /**
   * customize the default settings for the loaders
   */
  overrideLoader: {
    babelLoader?: RuleSetRule;
    styleLoader?: RuleSetRule;
  };

  /**
   * option to enable ModuleFederationPluginOptions
   */
  moduleFederationOptions: ModuleFederationPluginOptions;
}

export type ITSREXConfig = Partial<ITSREXConfigBase>;
