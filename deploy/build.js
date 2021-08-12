const path = require('path');

const inputFile = path.join(__dirname, '../dist/src/main-script.js');
const outpuFile = path.join(__dirname, '../dist/bin/tsrx.js');

require('esbuild')
  .build({
    entryPoints: [inputFile],
    bundle: true,
    platform: 'node',
    minify: true,
    outfile: outpuFile,
    external: [
      'html-webpack-plugin',
      'react',
      'react-dom',
      'terser-webpack-plugin',
      'tsconfig-paths-webpack-plugin',
      'typescript',
      'webpack',
      'webpack-bundle-analyzer',
      'webpack-dev-server',
      '@pmmmwh/react-refresh-webpack-plugin',
    ],
  })
  .catch(() => process.exit(1));
