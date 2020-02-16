import {assert, fail} from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: 'languageAgnosticTest',
  async fn() {
    const proc = Deno.run({
      args: ['python', 'test/language_agnostic_tester.py', `test/deno_testee.js`],
      cwd: Deno.cwd(),
      stdout: 'piped',
    });

    await proc.status()
      .then(status => {
        assert(status.success);
        return proc.output();
      })
      .then(output => {
        const outStr = new TextDecoder().decode(output);
        assert(!outStr.includes('F') && !outStr.includes('J'), outStr);
      })
      .catch(e => fail(e));
  }
});
