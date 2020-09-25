import { ArrCase, ObjCase } from '../types/types';

export function initCases(newCases: ArrCase[] | ObjCase): ObjCase {
  if (Array.isArray(newCases)) {
    const newObjCases: ObjCase = {};
    for (let i = 0; i < newCases.length; i++) {
      let newCase = newCases[i];
      if (newCase.key && newCase.value) {
        newObjCases[newCase.key] = newCase.value;
      }
    }

    return newObjCases;
  }

  if (typeof newCases === 'object') {
    return { ...newCases };
  }

  return {};
}
