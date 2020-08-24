import { LocalAgent } from "../src/shell/local_agent";
import { FirrtlConverterOpts, FirrtlConverter } from "../src/converters/firrtl_converter";
import { DiffieHellman } from "crypto";
import { Digitaljs } from "../src/digitaljs";
import { pretty_str } from "../src/utils";
import { readdirSync, promises } from "fs";
import { fileListFromDir, compareWithPreviousRun } from "./utils";

const cfgs : Array<FirrtlConverterOpts> = [
  { enviroment: "docker" },
  { enviroment: "local", firrtl2digitaljs_path: __dirname + "/../third_party/bin/firrtl2digitaljs.jar" }
]

describe("Firrtl Converter", () => {
  const dirs = readdirSync("./tests/in/firrtl");
  cfgs.forEach(cfg => {
    describe("Enviroment: " + cfg.enviroment, () => {
      const agent = new LocalAgent();
      const converter = new FirrtlConverter(agent, cfg);
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;
      dirs.forEach(dir => {
        describe("Cicuit from ./tests/in/firrtl/" + dir, () => {
          it("Should convert simple circuit", async () => {
            const fileList = await fileListFromDir("./tests/in/firrtl/" + dir);
            const simple = await converter.convert(fileList, {});
            compareWithPreviousRun(simple.output, "./tests/out/firrtl", dir);
          });
        });
      })
    });
  });
})

