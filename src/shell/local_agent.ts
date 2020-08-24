import {Agent, CommandResult} from './agent'
import { spawn, exec } from 'child_process'

export class LocalAgent implements Agent {
    cmd = (command : string) : Promise<CommandResult> =>
        new Promise((resolve, rejects) => {
            exec(command, (error, stdout, stderr) => {
                if (error)
                    rejects(error);

                resolve({
                    stderr,
                    stdout,
                    ret: 0
                })
            })
        })
}
