#!/usr/bin/env node

import('../src/docopt.mjs')
  .then(({default: docopt}) => {
      const doc = require('fs').readFileSync(0, 'utf-8');
      console.log(JSON.stringify(docopt(doc)));
  })
  .catch(() => console.log('"user-error"'));
