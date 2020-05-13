import logger from './logger';

let CONFIG_ENV = process.env.CONFIG_ENV;
if (CONFIG_ENV === undefined) {
  throw new Error(`
  =============================

    COMPILATION ERROR:
    Field CONFIG_ENV does not exists in process.env.

  =============================
  `);
}

try {
  CONFIG_ENV = JSON.parse(CONFIG_ENV);
} catch (err) {
  logger.error(`
  =============================

    PARSING ERROR:
    Field CONFIG_ENV can't be parsed to object

  =============================
  `);
  throw err;
}

export type IType<T> = new (...args: any[]) => T;

export default function <T>(configurationClassType: IType<T>): T {
  const configObject = new configurationClassType();
  const properties = Object.getOwnPropertyNames(configObject);
  properties.forEach((property) => {
    const configFromEnv = CONFIG_ENV[property];
    if (VerifyProperty(configObject[property])) {
      if (configFromEnv === undefined) {
        ErrorConfigurationError(configurationClassType.name, property);
      } else {
        configObject[property] = configFromEnv;
      }
    }
  });
  return configObject;
}

function VerifyProperty(property: any) {
  return typeof property !== 'function';
}

function ErrorConfigurationError(objectName: string, property: string) {
  logger.error(`
=============================

  CONFIGURATION ERROR:
  Property ${property} from ${objectName}
  does not exists in the environment
  defined in the react.config file.

=============================
 `);
}
