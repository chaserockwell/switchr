import { ObjCase } from '../types/types';

export function getValue(this: any, value: any, ...args: any[]): any {
  if (typeof value === 'function') {
    return value.call(this, ...args);
  }

  return value;
}

export function getDefault(_default: ObjCase, ...args: any[]) {
  if (!_default) {
    return null;
  }

  return getValue(_default, ...args);
}
