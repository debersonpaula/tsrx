# TSRX

This package replaces TSREX, due to removal of EXREDUX from the packages, giving freedom to choose any state management.

[![Version](https://img.shields.io/npm/v/tsrx.svg)](https://npmjs.org/package/tsrx)

### <b>T</b>ype<b>S</b>cript + <b>React</b>

This package contains the following modules:

- Typescript > 3.8
- React > 16.13
- Jest 25 + Enzyme 3 (for tests)

The builder has the following module bundlers:

- Webpack > 4.43
- Babel > 7.9

## Install

```bash
# install tsrx
npm i -S tsrx
```

## Setup tsconfig and tslint

Extend base tsconfig.json from TSRX folder:

```json
{
  "extends": "./node_modules/tsrx/tsconfig.json",
  "compilerOptions": {}
}
```

Same for tslint.json:

```json
{
  "extends": "./node_modules/tsrx/tslint.json"
}
```

## Setup the script configuration

Create a js file as example below to setup the scrips command:

Ex.: _react.config.js_

```js
var trsConfig = require('tsrx/tools/tsReactConfig').tsReactConfigValidator;

module.exports = trsConfig({
  // source of files
  source: 'src',
  // output path
  outputPath: 'dist',
  // port to be used in development
  // will be set in webpack-dev-server
  port: 8080,
  // hostname to be used in development
  // will be set in webpack-dev-server
  host: 'localhost',
  // all enviroments to be set in process.env
  nodeEnv: {
    commentsExample: 'Comment from Node Enviroments',
    booleanValueExample: true,
    numericValueExample: 37,
  },
  // all enviroments to be set in HTMLWebpackPlugin
  // available in HTML thru <%= htmlWebpackPlugin.options.propertyName %>
  htmlEnv: {
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
module.exports = trsConfig({
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

In case if is necessary to customize webpack-dev-server options, just include "__devServer__" in your _react.config.test.js_:

```js
module.exports = trsConfig({
  devServer: {
    open: true,
    hot: true,
    publicPath: '/',
    contentBase: path.join(__dirname, 'dist'),
  },
  ...
});
```

## Webpack options customization

Any properties defined in this property will override TSREX config:
```js
module.exports = trsConfig({
  webpack: {
    // insert your config here
  }
});
```

## Enable React Hot Loader

This utility, enables the plugin __react-hot-loader__, that increments your application without losing the current state.

To use this utility, just enable it in your _react.config.test.js_:
```js
module.exports = trsConfig({
  reactHotLoader: true,
  ...
});
```

And wrap the main app with the _reactHot_ function:
```tsx
import * as React from 'react';
import { reactHot } from 'tsrx/tools/reactHot';

class App extends React.Component {
  render() {
    return (
      <div>Component Hot Reload Test</div>
    );
  }
}

export default reactHot(module, App);
```

## Sample Project

[tsrex-sample](https://github.com/debersonpaula/tsrx-sample)