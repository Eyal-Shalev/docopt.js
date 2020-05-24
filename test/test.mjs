export const isDeno = typeof Deno !== 'undefined';

(async () => {
  (isDeno ? import('./deno_helper.ts') : import('./nodejs_helper.mjs')).then(({run, exit}) => {
    run(['python', 'test/language_agnostic_tester.py', isDeno ? 'test/deno_testee.sh' : 'test/nodejs_testee.sh'])
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
  }).catch(console.error)
})()
