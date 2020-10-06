import { ArrCase, ObjCase } from '../types/types';

export function initCases(newCases: ArrCase[] | ObjCase): ObjCase {
  if (Array.isArray(newCases)) {
    const newObjCases: ObjCase = {};
    for (const _case of newCases) {
      if (_case.key && _case.keys) {
        throw({ SWITCHR_KEY_ERROR: 'Both `key` and `keys` properties cannot be used on the same case'});
      }
      if (_case.key && _case.value) {
        newObjCases[_case.key] = _case.value;
      } else if (_case.keys && _case.value) {
        for (const key of _case.keys) {
          newObjCases[key] = _case.value;
        }
      }
    }

    return newObjCases;
  }

  if (typeof newCases === 'object') {
    return { ...newCases };
  }

  return {};
}
