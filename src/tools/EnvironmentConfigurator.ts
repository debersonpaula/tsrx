import logger from './logger';

export type IType<T> = new (...args: any[]) => T;

export default function <T>(configurationClassType: IType<T>): T {
  let CONFIG_ENV = process.env.CONFIG_ENV;
  const CONFIG_ENV_VALIDATOR = process.env.CONFIG_ENV_VALIDATOR;
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

  const configObject = new configurationClassType();
  const properties = Object.getOwnPropertyNames(configObject);
  let isFailed = false;
  properties.forEach((property) => {
    const configFromEnv = CONFIG_ENV[property];
    if (VerifyProperty(configObject[property])) {
      if (configFromEnv === undefined) {
        ErrorConfigurationError(configurationClassType.name, property);
        isFailed = true;
      } else {
        configObject[property] = ParseConfig(configFromEnv);
      }
    }
  });
  if (isFailed && CONFIG_ENV_VALIDATOR) {
    throw new Error(
      'Not possible to validate the options due to missing variables.',
    );
  }
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

function ParseConfig(configValue: any) {
  let result: any;
  try {
    result = JSON.parse(configValue);
  } catch {
    result = configValue;
  }
  return result;
}
