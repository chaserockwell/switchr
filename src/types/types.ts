export type Key = string | number;
export type ArrCase = { key?: Key; keys?: Key[]; value: any };
export type ObjCase = { [key in Key]: any };
