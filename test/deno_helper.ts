export const exit = Deno.exit

/**
 * @param {string[]} args
 * @return {Promise<string>}
 */
export const run = (args: string[]) => Deno
  .run({ cmd: args, cwd: Deno.cwd(), stdout: 'piped' })
  .output()
  .then(out => new TextDecoder().decode(out));

/**
 * @return {Promise<string>}
 */
export const getDoc = () => Deno
  .readAll(Deno.stdin)
  .then((out: Uint8Array) => new TextDecoder().decode(out));
