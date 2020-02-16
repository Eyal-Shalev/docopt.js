#!/usr/bin/env bash

curl -fsSL https://deno.land/x/install/install.sh | sh
export DENO_INSTALL="/root/.local"
export PATH="$DENO_INSTALL/bin:$PATH"
deno fetch test/deno_docopt_test.js
deno test -A test/deno_docopt_test.js
