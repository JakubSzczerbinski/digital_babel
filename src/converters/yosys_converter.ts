import { Converter, FileList, ConversionOpts, ConverterOutput } from "./converter";
import { Digitaljs } from "../digitaljs";
import { isDigitaljs, assertIsDigitaljs } from "../digitaljs/validator"
import * as yosys2digitaljs from "yosys2digitaljs";
import { last_element } from "../utils";

export class YosysConverter implements Converter {

  match = (filename : string) : boolean => {
    const extension = last_element(filename.split("."));
    return extension == "v" || extension == "sv";
  }

  convert = async (files : FileList, cfg : ConversionOpts) : Promise<ConverterOutput> => {
    const data : ConverterOutput = await yosys2digitaljs.process_files(files, cfg);
    yosys2digitaljs.io_ui(data.output);
    assertIsDigitaljs(data.output);
    return data;
  }
}
