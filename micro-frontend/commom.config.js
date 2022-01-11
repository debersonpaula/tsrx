const { DefaultConfig } = require('../dist/bin/tools');

module.exports = ({ appName, appPath, port, expose = false, remotes = null }) =>
  DefaultConfig({
    // source of files
    sourcePath: appPath,
    // index file
    sourceFile: 'index.ts',
    // output path
    outputPath: `build/${appName}`,
    publicFolder: 'micro-frontend/public',

    // port
    port,
    // hostname
    host: 'localhost',
    // development server
    devServer: {
      open: true,
    },
    // skip config file
    skipConfigFile: true,

    moduleFederationOptions: {
      name: appName,
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '17.0.2' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '17.0.2' },
      },
      filename: 'remoteEntry.js',
      exposes: expose
        ? {
            './App': `./${appPath}/App`,
          }
        : {},
      remotes: remotes || {},
    },
    enablePaths: true,
  });
