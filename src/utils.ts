
export type ObjMap<T> = { [key : string] : T }
export const last_element = <T>(array : Array<T>) : T | undefined => array[array.length - 1]
export const pretty_str = (obj : any) => JSON.stringify(obj, undefined, 4);