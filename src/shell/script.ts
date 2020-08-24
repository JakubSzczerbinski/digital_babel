import {encodeString, toBase64, encodeCommand} from "./helpers";
import { Agent } from "./agent";

export class Script {
  contents : Array<string>;
  constructor() {
    this.contents = [];
  }
  cmd = (cmd : string) => { this.contents.push(cmd); return }
  cd = (dir : string) => this.cmd("cd " + encodeString(dir))
  touch = (filename : string) => this.cmd("touch " + encodeString(filename))
  cat = (filename : string) => this.cmd("cat " + encodeString(filename))
  echo = (str : string) => this.cmd("echo " + toBase64(str) + " | base64 -d")
  mktempdir  = (dir_var : string) => this.cmd(dir_var + "=$(mktemp -d)")
  writeFile = (filename : string, contents : string) =>
    this.cmd("echo " + toBase64(contents) + " | base64 -d > " + encodeString(filename))
  run = (agent: Agent) =>
    agent.cmd(encodeCommand(this.contents.join("\n")))
}

export function make_script_template<T>(fun : (args : T) => string) : (args : T) => Script {
  return (args : T) : Script => {
    const script = new Script();
    const content = fun(args);
    content.split("\n").forEach(line => script.cmd(line));
    return script;
  }
} 
