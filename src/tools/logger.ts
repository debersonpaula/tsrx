// import chalk from 'chalk';

export function information(message?: any, ...optionalParams: any[]) {
  // tslint:disable-next-line: no-console
  console.log(message, ...optionalParams);
}

export function warning(message?: any, ...optionalParams: any[]) {
  // tslint:disable-next-line: no-console
  // console.warn(chalk.yellow(message), ...optionalParams);
  console.warn(message, ...optionalParams);
}

export function error(message?: any, ...optionalParams: any[]) {
  // tslint:disable-next-line: no-console
  // console.error(chalk.red(message), ...optionalParams);
  console.error(message, ...optionalParams);
}

export default {
  information,
  warning,
  error,
};
