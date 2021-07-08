const configurator = require('../commom.config');
const appName = 'main';
const appPath = 'micro-frontend/' + appName;
const port = 5000;

module.exports = configurator({
  appName,
  appPath,
  port,
  expose: false,
  remotes: {
    // app1: 'app1@http://localhost:4000/remoteEntry.js',
    // app2: 'app2@http://localhost:4001/remoteEntry.js',
    app1: 'app1@/app1/remoteEntry.js',
    app2: 'app2@/app2/remoteEntry.js',
  },
});
