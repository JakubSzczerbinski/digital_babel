import {Agent, CommandResult} from './agent'
import {toBase64, encodeCommand} from './helpers';

export type SSHOpts = {
    username?: string,
    host: string,
    port?: number
}

export class SSHAgent implements Agent {
    agent : Agent
    opts : SSHOpts
    constructor(agent : Agent, opts : SSHOpts) {
        this.agent = agent;
        this.opts = opts;
    }

    buildSshCommand = (command : string) : string => {
        let result = "ssh ";
        if (this.opts.port)
            result += "-p " + this.opts.port + " ";

        if (this.opts.username)
            result += this.opts.username + "@";
        
        result += this.opts.host + " ";
        
        return result + "'" + encodeCommand(command) + "'";
    }

    cmd = (command : string) : Promise<CommandResult> =>
        this.agent.cmd(this.buildSshCommand(command));
}
