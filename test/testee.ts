import {getDoc} from './test_helper.mjs'
import docopt from "../src/docopt.ts";

getDoc()
  .then((doc:string) => {
    console.log(JSON.stringify(docopt(doc)))
  })
  .catch((_:any) => {
    console.log('"user-error"')
  });
