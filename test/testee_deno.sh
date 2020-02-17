#!/usr/bin/env sh

deno ./test/testee.mjs "$@" <&0 >&1 2>&2
