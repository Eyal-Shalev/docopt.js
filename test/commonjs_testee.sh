#!/usr/bin/env sh

node ./test/commonjs_testee.js "$@" <&0 >&1 2>&2
