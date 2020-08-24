
export const toBase64 = (str : string) => Buffer.from(str).toString('base64')
export const fromBase64 = (str : string) => Buffer.from(str, 'base64').toString()
export const encodeCommand = (cmd : string) => "echo " + toBase64(cmd) + " | base64 -d | sh"
export const encodeString = (filename : string) => "$(echo " + toBase64(filename) + " | base64 -d)"
