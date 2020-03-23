export default function logger(message?: any, ...optionalParams: any[]) {
  // tslint:disable-next-line: no-console
  console.log(message, ...optionalParams);
}
