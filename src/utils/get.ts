import { Key, ObjCase } from '../types/types';
import { getDefault, getValue } from './get-value';

interface GetOptions {
  default: ObjCase;
  findCase: (key: Key) => ObjCase;
}

export function get(options: GetOptions): any {
  return function (key: Key, ...args: any[]) {
    const _case = options.findCase(key);
    if (_case) {
      return getValue(_case, ...args);
    }

    return getDefault(options.default, ...args);
  };
}
