const configurator = require('../commom.config');
const appName = 'app2';
const appPath = 'micro-frontend/' + appName;
const port = 4001;

module.exports = configurator({ appName, appPath, port, expose: true });
