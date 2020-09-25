import { ArrCase, ObjCase } from '../types/types';

export function initCases(newCases: ArrCase[] | ObjCase): ObjCase {
  if (Array.isArray(newCases)) {
    const newObjCases: ObjCase = {};
    for (const newCase of newCases) {
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
