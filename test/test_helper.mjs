// @ts-nocheck
export const isDeno = typeof Deno !== 'undefined';
export const isNode = (typeof process !== 'undefined') && (process.release.name === 'node');

export const exit = (code) => {
  switch (true) {
    case isDeno:
      return Deno.exit(1);
    case isNode:
      return process.exit(1);
    default:
      throw new Error('Unsupported runtime environment');
  }
};

/**
 * @param {string[]} args
 * @return {Promise<string>}
 */
export const run = (args) => {
  switch (true) {
    case isDeno:
      return Deno.run({ args, cwd: Deno.cwd(), stdout: 'piped' })
        .output()
        .then(out => new TextDecoder().decode(out));
    case isNode:
      return import('child_process').then(({execSync}) => execSync(args.join(' ')).toString('utf-8'));
    default:
      throw new Error('Unsupported runtime environment');
  }
};

/**
 * @return {Promise<string>}
 */
export const getDoc = () => {
  switch (true) {
    case isDeno:
      return Deno.readAll(Deno.stdin)
        .then(out => new TextDecoder().decode(out));
    case isNode:
      return import('fs').then(fs => fs.readFileSync(0, 'utf-8'));
    default:
      throw new Error('Unsupported runtime environment');
  }
};
