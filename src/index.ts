import Switchr from './interfaces/switchr';
import { ArrCase, Key, ObjCase } from './types/types';
import { caseFinder, getDefault, getValue, initCases } from './utils';

function switchr(cases: ArrCase[] | ObjCase): Switchr {
  const _cases = initCases(cases);
  const findCase = caseFinder(_cases);
  let _default = findCase("default");

  return {
    get(key: Key, ...args: any[]): any {
      const _case = findCase(key);
      if (_case) {
        return getValue(_case, ...args);
      }

      return getDefault(_default, ...args);
    },
    set(key: Key, value: any) {
      _cases[key] = value;
      if (key === "default") {
        _default = value;
      }
    },
    has(key: Key): boolean {
      for (const switchKey in _cases) {
        if (switchKey == key) {
          return true;
        }
      }

      return false;
    },
    list(): string[] {
      const keys = [];
      for (const key in _cases) {
        keys.push(key);
      }

      return keys;
    },
  };
}

export default switchr;
