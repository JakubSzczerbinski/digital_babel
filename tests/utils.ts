import { promises, readFileSync } from "fs";
import { FileList } from "../src/converters/converter";
import { join, normalize, sep } from "path";
import { Digitaljs } from "../src/digitaljs";
import { diff } from "json-diff";
import { pretty_str } from "../src/utils";

const fs = promises;

export const fileListFromDir = async (dir : string) => {
    const files = await fs.readdir(dir);
    let fileList : FileList = {};
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        const file_contents = await (await fs.readFile(join(dir, filename))).toString();
        fileList = {...fileList, [filename]: file_contents};
    }
    return fileList;
}

export const ensureExists = async(path : string) => {
    await fs.mkdir(path, {recursive: true})
        .catch(err => {
            if (err.code == "EEXIST") {
                return;
            }
        })
}

export const compareWithPreviousRun = async (output : Digitaljs, out_dir : string, test_name: string) => {
    await ensureExists(out_dir);

    const previousFilename = join(out_dir, test_name + ".json");
    const diffFilename = join(out_dir, test_name + ".diff.json");
    const newFilename = join(out_dir, test_name + ".new.json");

    const previousFileContents = await fs.readFile(previousFilename)
        .then(contents => contents.toString())
        .catch(async err => {
            if (err.code == 'ENOENT') {
                const contents = JSON.stringify(output);
                await fs.writeFile(previousFilename, contents);
                return contents;
            }

            throw err;
        })

    const previous = JSON.parse(previousFileContents);
    const diffrences = diff(previous, output);

    if (diffrences) {
        fs.writeFile(diffFilename, pretty_str(diffrences));
        fs.writeFile(newFilename, pretty_str(output));
        throw Error(`
            Diffrences occured between previous and new run.
            Inspect diffrences in file: ${diffFilename}.
            If the output of new run is correct,
            subsitute ${previousFilename} for ${newFilename}.
        `)
    }
}
