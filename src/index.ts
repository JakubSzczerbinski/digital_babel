import { ConversionOpts, FileList } from "./converters/converter"
import { FirrtlConverter } from "./converters/firrtl_converter"
import { CombinedConverter } from "./converters/combined_converter"
import { YosysConverter } from "./converters/yosys_converter";
import { LocalAgent } from "./shell/local_agent";
import { ChiselConverter } from "./converters/chisel_converter";
import { SSHAgent, SSHOpts } from "./shell/ssh_agent";

export type Config = {
  firrtl2digitaljs_path: string
  use_docker: "no" | "if_possible" | "always",
  ssh_opts?: SSHOpts
}

export type OptConfig = {
  [P in keyof Config]? : Config[P]
}

export const default_config : Config = {
  firrtl2digitaljs_path: __dirname + "/../third_party/bin/firrtl2digitaljs.jar",
  use_docker: "if_possible",
}

export class DigitalBabel {
  cfg : Config
  cm : CombinedConverter

  constructor(cfg : OptConfig) {
    this.cfg = {...cfg, ...default_config}
    let agent = new LocalAgent();

    if (this.cfg.ssh_opts) {
      agent = new SSHAgent(agent, this.cfg.ssh_opts);
    }

    this.cm = new CombinedConverter([]);

    if (this.cfg.use_docker == "always" || this.cfg.use_docker == "if_possible") {
      this.cm.register_converter(new FirrtlConverter(
        agent,
        { enviroment: "docker" }
      ));

      this.cm.register_converter(new ChiselConverter(
        agent,
        { enviroment: "docker" 
        , middleware: "firrtl2digitaljs"
        , f2d_opts: { enviroment: "docker" }
        }
      ));
    }

    if (this.cfg.use_docker == "no") {
      this.cm.register_converter(new FirrtlConverter(
        agent,
        { enviroment: "local"
        , firrtl2digitaljs_path: this.cfg.firrtl2digitaljs_path },
      ))

      this.cm.register_converter(new ChiselConverter(
        agent,
        { enviroment: "local"
        , middleware: "yosys" }
      ))
    }

    if (this.cfg.use_docker == "if_possible" || this.cfg.use_docker == "no") {
      this.cm.register_converter(new YosysConverter())
    }
  }

  convertWithOpts = (files : FileList, opts : ConversionOpts) =>
    this.cm.convert(files, opts)

  convert = (files : FileList) =>
    this.cm.convert(files, {})
}
