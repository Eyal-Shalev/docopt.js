Deno.run({cmd: ['python', 'test/language_agnostic_tester.py', 'test/deno_testee.sh'], cwd: Deno.cwd(), stdout: 'piped'})
  .output()
  .then(out => new TextDecoder().decode(out))
  .then(result => {
    if (result.includes('F') || result.includes('J')) {
      return Promise.reject(result);
    } else {
      console.log(result);
    }
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });
