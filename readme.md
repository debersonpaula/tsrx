# TSREACT

This package replaces TSREX, due to removal of EXREDUX from the packages, giving freedom to choose any state management.

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
# install TSREACT
npm i -S tsreact
```

## Setup tsconfig and tslint

Extend base tsconfig.json from TSREX folder:

```json
{
  "extends": "./node_modules/tsreact/tsconfig.json",
  "compilerOptions": {

  }
}
```

Same for tslint.json:

```json
{
  "extends": "./node_modules/tsreact/tslint.json",

}
```
