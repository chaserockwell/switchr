import { Key } from '../types/types';

export default interface Switchr {
  get: (key: Key, ...args: any[]) => any;
  set: (key: Key, value: any) => void;
  has: (key: Key) => boolean;
  list: () => string[];
}
