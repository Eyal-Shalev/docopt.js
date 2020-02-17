import {run, exit, isDeno} from "./test_helper.mjs";

run(['python', 'test/language_agnostic_tester.py', isDeno ? 'test/testee_deno.sh' : 'test/testee_node.sh'])
  .then(result => {
    if (result.includes('F') || result.includes('J')) {
      return Promise.reject(result);
    } else {
      console.log(result);
    }
  })
  .catch(e => {
    console.error(e);
    exit(1);
  });
