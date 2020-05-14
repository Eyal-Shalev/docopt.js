#!/usr/bin/env sh

deno run ./test/testee.ts "$@" <&0 >&1 2>&2
