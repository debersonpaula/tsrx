const configurator = require('../commom.config');
const appName = 'app1';
const appPath = 'micro-frontend/' + appName;
const port = 4000;

module.exports = configurator({ appName, appPath, port, expose: true });
