import { LocalAgent } from "../src/shell/local_agent";
import { FirrtlConverterOpts, FirrtlConverter } from "../src/converters/firrtl_converter";
import { YosysConverter } from "../src/converters/yosys_converter";
import { readdirSync, promises } from "fs";
import { fileListFromDir, compareWithPreviousRun } from "./utils";
import { pretty_str } from "../src/utils";

describe("Yosys Converter", () => {
  const dirs = readdirSync("./tests/in/yosys");
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;
  const converter = new YosysConverter();
  dirs.forEach(dir => {
    describe("Cicuit from ./tests/in/yosys/" + dir, () => {
      it("Should convert circuit", async () => {
        const fileList = await fileListFromDir("./tests/in/yosys/" + dir);
        const simple = await converter.convert(fileList, {});
        compareWithPreviousRun(simple.output, "./tests/out/yosys", dir);
      });
    });
  })
})
