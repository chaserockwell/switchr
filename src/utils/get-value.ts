import { ObjCase } from '../types/types';

export function getValue(value: any, ...args: any[]): any {
  if (typeof value === 'function') {
    return value.call(globalThis, ...args);
  }

  return value;
}

export function getDefault(_default: ObjCase, ...args: any[]) {
  if (!_default) {
    return null;
  }

  return getValue(_default, ...args);
}
