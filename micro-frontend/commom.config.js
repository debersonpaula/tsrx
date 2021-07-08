var DefaultConfig = require('../dist/bin/tools').DefaultConfig;
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const path = require('path');

module.exports = ({ appName, appPath, port, expose = false, remotes = null }) =>
  DefaultConfig({
    // source of files
    sourcePath: appPath,
    // index file
    sourceFile: 'index.ts',
    // output path
    outputPath: `dist/${appName}`,
    // index.html template
    htmlTemplate: `${appPath}/index.html`,
    // port
    port,
    // hostname
    host: 'localhost',
    // development server
    devServer: {
      open: true,
      contentBase: path.join(__dirname, 'dist'),
    },
    // skip config file
    skipConfigFile: true,

    webpack: (config) => {
      const moduleFederationConfig = {
        name: appName,
        shared: {
          // react: { singleton: true, eager: true },
          // 'react-dom': { singleton: true, eager: true },
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      };

      if (expose) {
        moduleFederationConfig.filename = 'remoteEntry.js';
        moduleFederationConfig.exposes = {
          './App': `./${appPath}/App`,
        };
      }

      if (remotes) {
        moduleFederationConfig.remotes = remotes;
        // moduleFederationConfig.remoteType = 'var';
      }

      config.plugins.push(new ModuleFederationPlugin(moduleFederationConfig));
      config.plugins.push(new ExternalTemplateRemotesPlugin());

      config.entry = `${appPath}/index`; // <=== to work with federation modules
    },
  });
