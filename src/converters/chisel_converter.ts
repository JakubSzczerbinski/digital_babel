import { Converter, FileList, ConversionOpts, ConverterOutput } from "./converter";
import { Agent } from "../shell/agent";
import { Script, make_script_template } from "../shell/script";
import { FirrtlConverterOpts, FirrtlConverter } from "./firrtl_converter";
import { DockerAgent } from "../shell/docker_agent";
import { YosysConverter } from "./yosys_converter";
import { last_element, pretty_str } from "../utils";
import { findSourceMap } from "module";

const BUILD_SBT = `
scalaVersion := "2.11.7"

offline := true

resolvers ++= Seq(
  Resolver.sonatypeRepo("snapshots"),
  Resolver.sonatypeRepo("releases")
)

libraryDependencies += "edu.berkeley.cs" %% "chisel3" % "3.2.2"
`;

export type ChiselConverterOpts = {
  enviroment: "docker" | "local"
} & ({
  middleware: "yosys"
} | {
  middleware: "firrtl2digitaljs",
  f2d_opts: FirrtlConverterOpts
})

export class ChiselConverter implements Converter {
  agent : Agent 
  opts : ChiselConverterOpts
  constructor(agent : Agent, opts: ChiselConverterOpts) {
    this.agent = agent;
    this.opts = opts;
  }

  match = (filename : string) : boolean => {
    const extension = last_element(filename.split("."));
    return extension == "scala" || extension == "sc";
  }

  make_agent = (agent : Agent) => {
    if (this.opts.enviroment == "docker") {
      return new DockerAgent(agent, { image_name: "szczerbi/sbt_chisel", network: "none" });
    }
    return agent;
  }

  check_errors = (stderr : string) => {
    const lines = stderr.split("\n");
    const errors : Array<string> = lines.reduce((acc : Array<string>, line : string) : Array<string> => {
      if (line.indexOf("[error]") != -1)
        return [line, ...acc];

      const first = acc[0];

      if (first) {
        return [first + "\n" + line, ...acc.slice(1)];
      }

      return acc;
    }, []).reverse();
    if (errors.length != 0) {
      throw new Error("Compilation errors: \n" + errors.join("\n"))
    }
  }

  convert = async (files : FileList, cfg : ConversionOpts) : Promise<ConverterOutput> => {
    const script = new Script();
    script.mktempdir("WORKDIR");
    script.cmd("cd $WORKDIR")
    script.cmd("mkdir -p src/main/scala")
    Object.keys(files).forEach(filename => {
      script.writeFile("src/main/scala/" + filename, files[filename])
    })
    script.writeFile("build.sbt", BUILD_SBT);
    script.cmd("sbt run 1>&2")
    switch (this.opts.middleware) {

      case "firrtl2digitaljs": {
        script.cat("Main.fir");
        script.cmd("rm $WORKDIR -rf");
        const script_result = (await script.run(this.make_agent(this.agent)));
        this.check_errors(script_result.stderr);
        const firrtl = script_result.stdout;
        const firrtl_converter = new FirrtlConverter(this.agent, this.opts.f2d_opts);
        return firrtl_converter.convert({
          "Main.fir": firrtl,
        }, {});
      }

      case "yosys": {
        script.cat("Main.v");
        script.cmd("rm $WORKDIR -rf");
        const script_result = (await script.run(this.make_agent(this.agent)));
        this.check_errors(script_result.stderr);
        const verilog = script_result.stdout;
        const yosys_converter = new YosysConverter()
        return yosys_converter.convert({
          "Main.v": verilog,
        }, {})
      }
    }
  }
}