#!/usr/bin/env sh

node ./test/nodejs_testee.mjs "$@" <&0 >&1 2>&2
