import {ensureFile, writeFileStr, move} from 'https://deno.land/std/fs/mod.ts'

const base = await Deno.realPath(import.meta.url.slice('file://'.length) + '/../..')

const [diagnostics, emit] = await Deno.bundle(`${base}/src/docopt.ts`, undefined, {
  target: "es2019",
})

console.assert(diagnostics == null); // ensuring no diagnostics are returned


await ensureFile(`${base}/dist/docopt.ts`)
await writeFileStr(`${base}/dist/docopt.ts`, emit)

await Deno.run({
    cmd: [
      'tsc',
      '-m', 'commonjs',
      '--moduleResolution', 'node',
      '-t', 'ES2018',
      '--lib', 'es2018,es2019.array,es2019.object',
      `${base}/dist/docopt.ts`,
    ],
    cwd: base,
    stdout: 'piped'
  })
  .output()
  .then((out: Uint8Array) => console.log(new TextDecoder().decode(out)))


await Promise.all([
  move(`${base}/dist/docopt.ts`, `${base}/dist/docopt.mjs`, { overwrite: true }),
  move(`${base}/dist/docopt.js`, `${base}/dist/docopt.cjs`, { overwrite: true }),
])
