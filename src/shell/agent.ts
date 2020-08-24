
export type CommandResult = {
    stdout: string,
    stderr: string,
    ret : number
}

export interface Agent {
    cmd(command : string) : Promise<CommandResult>
}
