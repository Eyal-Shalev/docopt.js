declare const Deno: any
declare const process: any

export const processArgv = (): string[] => (typeof Deno !== "undefined" && Deno.args) || (typeof process !== "undefined" && process.argv.slice(2)) || [];
