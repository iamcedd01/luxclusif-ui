/* eslint-disable @typescript-eslint/no-explicit-any */
export const useKeyOnly = (val: any, key: any) => val && key;
export const useValueAndKey = (val: any, key: any) => val && val !== true && `${key}-${val}`;
export const useKeyOrValueAndKey = (val: any, key: any) => val && (val === true ? key : `${val} ${key}`);
export const useVerticalAlignProp = (val: any) => useValueAndKey(val, 'aligned');
