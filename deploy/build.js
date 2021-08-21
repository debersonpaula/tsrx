const path = require('path');

const inputFile = path.join(__dirname, '../dist/src/main-script.js');
const outpuFile = path.join(__dirname, '../dist/bin/tsrx.js');

require('esbuild')
  .build({
    entryPoints: [inputFile],
    bundle: true,
    platform: 'node',
    minify: false,
    outfile: outpuFile,
    external: [
      '@pmmmwh/react-refresh-webpack-plugin',
      'html-webpack-plugin',
      'jest',
      'react',
      'react-dom',
      'terser-webpack-plugin',
      'tsconfig-paths-webpack-plugin',
      'typescript',
      'webpack',
      'webpack-bundle-analyzer',
      'webpack-dev-server',
      'whatwg-fetch',
      './addons/*',
    ],
  })
  .catch(() => process.exit(1));
