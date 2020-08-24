import { ConversionOpts, FileList, Converter, ConverterOutput } from "./converter"

export class CombinedConverter implements Converter {
  converters : Array<Converter>

  constructor(converters : Array<Converter>) {
    this.converters = converters
  }

  match = (filename: string) : boolean => 
    this.converters
      .find(converter => converter.match(filename)) != undefined

  convert(files : FileList, config: ConversionOpts) : Promise<ConverterOutput> {
    const converter = this.converters
      .find(converter => Object.keys(files).every(converter.match))
  
    if (!converter)
      throw "Failed to find matching converter"
    
    return converter.convert(files, config);
  }

  register_converter(conv : Converter) : void {
    this.converters.push(conv);
  }
}
