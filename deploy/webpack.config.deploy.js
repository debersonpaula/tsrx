const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'production',
  node: {
    __dirname: false,
  },
  // ==== ENTRY ============================================================================
  entry: [path.join(__dirname, '../dist/src/main-script.js')],
  // ==== OUTPUT ===========================================================================
  output: {
    path: path.join(__dirname, '../dist/bin'),
    filename: 'tsrx.js',
    sourcePrefix: '',
    libraryTarget: 'commonjs',
  },
  // ==== MODULE ===========================================================================
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
      },
    ],
  },
  // ==== RESOLVE ===========================================================================
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  // ==== PLUGINS ===========================================================================
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './dist/src/config/addons',
          to: 'addons',
        },
        {
          from: './dist/src/config/utils',
          to: 'utils',
        },
        {
          from: './tsconfig.json',
          to: '',
        },
        {
          from: './tslint.json',
          to: '',
        },
        {
          from: './readme.md',
          to: '',
        },
        {
          from: './package.json',
          to: '',
        },
      ],
    }),
  ],

  // ==== EXTERNALS =========================================================================
  externals: generateExternals([
    'awesome-typescript-loader',
    'axios',
    'enzyme',
    'html-webpack-plugin',
    'jest',
    'react',
    'react-dom',
    'terser-webpack-plugin',
    'typescript',
    'webpack',
    'webpack-bundle-analyzer',
    'webpack-dev-server',
  ]),
};

function generateExternals(list) {
  return list.reduce((total, current) => {
    total[current] = {
      commonjs: current,
    };
    return total;
  }, {});
}
