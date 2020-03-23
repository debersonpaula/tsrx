var fs = require('fs');
var path = require('path');

const binaryCaller = `#!/usr/bin/env node
require('./tsreact');`;
fs.writeFileSync(path.join(__dirname, '../dist-bin/index.js'), binaryCaller);
