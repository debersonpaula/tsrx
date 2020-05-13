import fs from 'fs';
import ts from 'typescript';

export default function (envConfigFileName: string, envObject: object) {
  process.env.CONFIG_ENV = JSON.stringify(envObject);
  process.env.CONFIG_ENV_VALIDATOR = JSON.stringify(true);
  const envConfigFileNameSource = fs.readFileSync(envConfigFileName);
  const result = ts.transpileModule(envConfigFileNameSource.toString(), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  // tslint:disable-next-line: no-eval
  eval(result.outputText);
}
