// tslint:disable-next-line: no-string-literal
global['requestAnimationFrame'] = (callback: any) => {
  setTimeout(callback, 0);
};
