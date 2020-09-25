export type Key = string | number;
export type ArrCase = { key: Key; value: any };
export type ObjCase = { [key in Key]: any };
