import {getDoc} from './test_helper.mjs'
import docopt from "../esm/docopt.js";

getDoc()
  .then(doc => {
    console.log(JSON.stringify(docopt(doc)))
  })
  .catch(e => {
    console.log('"user-error"')
  });
