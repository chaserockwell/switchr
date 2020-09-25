import { Key, ObjCase } from '../types/types';

export function caseFinder(cases: ObjCase): (key: Key) => ObjCase {
  return function (key: Key): ObjCase {
    return cases[key] || null;
  };
}
