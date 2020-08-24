import { Converter, FileList, ConversionOpts, ConverterOutput } from "./converter";
import { Digitaljs } from "../digitaljs";

export class EmptyConverter implements Converter {
  match = (filename : string) : boolean => false
  convert = (files : FileList, cfg : ConversionOpts) : Promise<ConverterOutput> => Promise.reject();
}
