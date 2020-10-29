#!/usr/bin/env sh

deno run ./test/deno_testee.ts "$@" <&0 >&1 2>&2
