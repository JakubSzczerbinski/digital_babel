import { Converter, FileList, ConversionOpts, ConverterOutput } from "./converter"
import * as yosys2digitaljs from "yosys2digitaljs";
import { Script } from "../shell/script";
import { Agent } from "../shell/agent";
import { encodeString } from "../shell/helpers";
import { DockerAgent } from "../shell/docker_agent";
import { Digitaljs } from "../digitaljs";
import { last_element } from "../utils";
import { asDigitaljs } from "../digitaljs/validator";

export type FirrtlConverterOpts = {
  enviroment: "local",
  firrtl2digitaljs_path: string,
} | {
  enviroment: "docker",
}

export class FirrtlConverter implements Converter {
  opts : FirrtlConverterOpts
  agent : Agent
  constructor(agent : Agent, opts: FirrtlConverterOpts) {
    this.opts = opts
    this.agent = agent
  }

  match = (filename: string): boolean => {
    const ext = last_element(filename.split('.'));
    return ext === "fir";
  }

  convert = async (files: FileList, cfg: ConversionOpts): Promise<ConverterOutput> => {
    if (Object.keys(files).length > 1) {
      throw "Firrtl converter uses only one file";
    }

    const filename = Object.keys(files)[0];
    const file_contents = files[filename];
    let script : Script = new Script();
    let agent = this.agent;
    switch(this.opts.enviroment) {

      case "local": {
        script.mktempdir("WORKDIR");
        script.cmd("cd $WORKDIR");
        script.writeFile(filename, file_contents);
        script.cmd("java -jar " + encodeString(this.opts.firrtl2digitaljs_path) + " " + encodeString(filename));
        script.cmd("rm -rf $WORKDIR");
        break;
      }

      case "docker": {
        script.writeFile(filename, file_contents);
        script.cmd("java -jar opt/firrtl2digitaljs.jar " + encodeString(filename));
        agent = new DockerAgent(agent, { image_name: "szczerbi/firrtl2digitaljs" } );
        break;
      }

    }

    const script_res = await script.run(agent);
    let result = {};

    try {
      result = JSON.parse(script_res.stdout);
    }
    catch (err) {
      throw new Error(`Failed to parse script output.
        error: ${err}
        stdout: ${script_res.stdout}
        stderr: ${script_res.stderr}
        ret: ${script_res.ret}
      `)
    }

    yosys2digitaljs.io_ui(result)
    return {
      output: asDigitaljs(result)
    }
  }
}


