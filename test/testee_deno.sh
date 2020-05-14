#!/usr/bin/env sh

deno run ./test/testee.mjs "$@" <&0 >&1 2>&2
