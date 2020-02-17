#!/usr/bin/env sh

node ./test/testee.mjs "$@" <&0 >&1 2>&2
