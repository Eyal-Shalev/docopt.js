#!/usr/bin/env deno
import docopt from "../src/docopt.mjs";
const doc = new TextDecoder().decode(Deno.readAllSync(Deno.stdin));
try {
    console.log(JSON.stringify(docopt(doc)));
}
catch (e) {
    console.log('"user-error"');
}
