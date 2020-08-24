
import { ObjMap } from "../utils"
import { Digitaljs } from "../digitaljs"

export interface ConversionOpts {}
export type FileList = ObjMap<string>
export interface ConverterOutput {
  output: Digitaljs
  [key : string] : any
}

export interface Converter {
  match(filename : string) : boolean 
  convert(files: FileList, cfg : ConversionOpts) : Promise<ConverterOutput>
}
