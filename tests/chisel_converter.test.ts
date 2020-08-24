import { ChiselConverterOpts, ChiselConverter } from "../src/converters/chisel_converter"
import { LocalAgent } from "../src/shell/local_agent";
import { readdirSync, promises } from "fs";
import { join } from "path";
import { fileListFromDir, compareWithPreviousRun } from "./utils";
import { pretty_str } from "../src/utils";

const cfgs : Array<ChiselConverterOpts> = [
  { enviroment: "docker", middleware: "yosys" },
  { enviroment: "local", middleware: "yosys" },
  { enviroment: "docker", middleware: "firrtl2digitaljs", f2d_opts: { enviroment: "docker" }},
  { enviroment: "local", middleware: "firrtl2digitaljs", f2d_opts: { enviroment: "docker" }},
]

describe("Chisel Converter", () => {
  const dirs = readdirSync("./tests/in/chisel");
  cfgs.forEach(cfg => {
    describe("Enviroment: " + cfg.enviroment + ", middleware: " + cfg.middleware, () => {
      const agent = new LocalAgent();
      const converter = new ChiselConverter(agent, cfg);
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;
      dirs.forEach(dir => {
        describe("Cicuit from ./tests/in/chisel/" + dir, () => {
          it("Should convert circuit", async () => {
            const fileList = await fileListFromDir("./tests/in/chisel/" + dir);
            const simple = await converter.convert(fileList, {});
            compareWithPreviousRun(simple.output, join("./tests/out/chisel", cfg.enviroment, cfg.middleware), dir);
          });
        });
      })
    });
  });
})

