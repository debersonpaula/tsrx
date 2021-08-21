# TSRX

[![Version](https://img.shields.io/npm/v/tsrx.svg)](https://npmjs.org/package/tsrx)

### <b>T</b>ype<b>S</b>cript + <b>React</b>

This package contains the following modules:

- Typescript > 4.3
- React > 17
- Jest 27 + testing-library

The builder has the following module bundlers:

- Webpack > 5.51
- Babel > 7.15

## Install

```bash
# install tsrx
npm i -S tsrx

# install dependencies
npm i -S react react-dom typescript

# install dev dependencies
npm i -D @types/react @types/react-dom

# install test utilities
npm i -D jest @testing-library/jest-dom @testing-library/react
```

## Setup tsconfig

Extend base tsconfig.json from TSRX folder:

```json
{
  "extends": "tsrx/tsconfig.json",
  "compilerOptions": {}
}
```

## Setup the script configuration

Create a js file as example below to setup the scrips command:

Ex.: _react.config.js_

```js
const { DefaultConfig } = require('tsrx/tools');

module.exports = DefaultConfig({
  // source of files
  sourcePath: 'src',
  // output path
  outputPath: 'dist',
  // port to be used in development
  // will be set in webpack-dev-server
  port: 8080,
  // hostname to be used in development
  // will be set in webpack-dev-server
  host: 'localhost',
  // all enviroments to be set in process.env
  env: {
    commentsExample: 'Comment from Node Enviroments',
    booleanValueExample: true,
    numericValueExample: 37,
    // all enviroments to be set in HTMLWebpackPlugin
    // available in HTML thru <%= htmlWebpackPlugin.options.propertyName %>
    htmlComments: 'Comment from HTML Enviroment',
  },
});
```

## Using scripts

TSRX have four methods to be used in scripts of the package.json.

Is better to set unique config file for each method:

```json
{
  "scripts": {
    "start": "tsrx start ./react.config.js",
    "build": "tsrx build ./react.config.prod.js",
    "test": "tsrx test ./react.config.test.js",
    "lib": "tsrx library ./react.config.lib.js"
  }
}
```

## Jest customization

In case, if your tests require specific Jest configuration, include jest property in your _react.config.test.js_:

```js
module.exports = DefaultConfig({
  source: 'application',
  outputPath: '',
  nodeEnv: {},
  htmlEnv: {},
  port: 0,
  hostname: '',
  jest: {
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    moduleNameMapper: {
      '@components/(.*)': '<rootDir>/src/components/$1',
      '@containers/(.*)': '<rootDir>/src/containers/$1',
      '@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
      '@services/(.*)': '<rootDir>/src/services/$1',
    },
    updateSnapshot: true,
  },
});
```

## DevServer customization

In case if is necessary to customize webpack-dev-server options, just include "**devServer**" in your _react.config.test.js_:

```js
module.exports = DefaultConfig({
  devServer: {
    open: true,
    publicPath: '/',
    contentBase: path.join(__dirname, 'dist'),
  },
  ...
});
```

## Webpack options customization

Any properties defined in this property will override TSREX config:

```js
module.exports = DefaultConfig({
  webpack: {
    // insert your config here
  },
});
```

## Sample Project

[tsrex-sample](https://github.com/debersonpaula/tsrx-sample)
