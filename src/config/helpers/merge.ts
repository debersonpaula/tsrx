import deepmerge from 'deepmerge';

export default function merge(obj1: any, obj2: any) {
  return deepmerge(obj1 || {}, obj2 || {});
}
