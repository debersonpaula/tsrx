const configurator = require('../commom.config');
const appName = 'main';
const appPath = 'micro-frontend/' + appName;
const port = 8000;

module.exports = configurator({
  appName,
  appPath,
  port,
  expose: false,
  remotes: {
    app1: 'app1@http://localhost:5000/app1/remoteEntry.js',
    app2: 'app2@http://localhost:5000/app2/remoteEntry.js',
  },
});
