const { DefaultConfig } = require('../dist/bin/tools');

module.exports = ({ appName, appPath, port, expose = false, remotes = null }) =>
  DefaultConfig({
    // source of files
    sourcePath: appPath,
    // index file
    sourceFile: 'index.ts',
    // output path
    outputPath: `build/${appName}`,
    // index.html template
    htmlTemplate: `${appPath}/index.html`,
    // port
    port,
    // hostname
    host: 'localhost',
    // development server
    devServer: {
      open: true,
      contentBase: './build',
    },
    reactHotLoader: true,
    // skip config file
    skipConfigFile: true,

    moduleFederationOptions: {
      name: appName,
      // shared: ['react', 'react-dom'],
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
      filename: 'remoteEntry.js',
      exposes: expose
        ? {
            './App': `./${appPath}/App`,
          }
        : {},
      remotes: remotes || {},
    },
  });
