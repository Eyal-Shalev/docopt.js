import docopt from "../mod.ts";

Deno
  .readAll(Deno.stdin)
  .then((out: Uint8Array) => new TextDecoder().decode(out))
  .then((doc:string) => {
    console.log(JSON.stringify(docopt(doc)))
  })
  .catch((_:any) => {
    console.log('"user-error"')
  });
