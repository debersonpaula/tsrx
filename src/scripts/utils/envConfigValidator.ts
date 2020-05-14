import fs from 'fs';
import ts from 'typescript';

export default function (
  envConfigFileName: string,
  envObject: object,
  overridePaths?: { [searchPath: string]: string },
) {
  process.env.CONFIG_ENV = JSON.stringify(envObject);
  process.env.CONFIG_ENV_VALIDATOR = JSON.stringify(true);
  const DEBUG_OVERRIDE_TSRX_SOURCE = process.env.DEBUG_OVERRIDE_TSRX_SOURCE;
  const buff = fs.readFileSync(envConfigFileName);

  let envConfigFileNameSource = buff.toString();

  if (overridePaths) {
    Object.keys(overridePaths).forEach((key) => {
      envConfigFileNameSource = envConfigFileNameSource.replace(
        key,
        overridePaths[key],
      );
    });
  }

  if (DEBUG_OVERRIDE_TSRX_SOURCE) {
    envConfigFileNameSource = envConfigFileNameSource.replace(
      'tsrx/',
      DEBUG_OVERRIDE_TSRX_SOURCE,
    );
  }

  const result = ts.transpileModule(envConfigFileNameSource.toString(), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
    },
  });
  // tslint:disable-next-line: no-eval
  eval(result.outputText);
}
