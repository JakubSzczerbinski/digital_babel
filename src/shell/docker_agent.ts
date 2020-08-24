import { Agent, CommandResult } from "./agent";
import { encodeCommand } from "./helpers";

export type DockerOpts = {
  image_name?: string,
  network?: string,
}

export class DockerAgent implements Agent {
  agent : Agent
  image_name: string
  network?: string

  constructor(agent : Agent, opts : DockerOpts) {
    this.agent = agent;
    this.image_name = opts.image_name ? opts.image_name : "debian";
    this.network = this.network;
  }

  cmd = (command : string) : Promise<CommandResult> => {
    let cmd = "docker run";

    if (this.network) {
      cmd += " --network " + this.network;
    }

    cmd += " " + this.image_name;

    cmd += " sh -c '" + encodeCommand(command) + "'";
    return this.agent.cmd(cmd);
  }
}