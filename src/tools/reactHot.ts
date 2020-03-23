import { hot } from 'react-hot-loader';

export function reactHot(moduleRef: any, reactClass: any) {
  if (process.env.NODE_ENV === 'development') {
    return hot(moduleRef)(reactClass);
  }
  return reactClass;
}
