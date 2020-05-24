import {getDoc} from './deno_helper.ts'
import docopt from "../src/docopt.ts";

getDoc()
  .then((doc:string) => {
    console.log(JSON.stringify(docopt(doc)))
  })
  .catch((_:any) => {
    console.log('"user-error"')
  });
