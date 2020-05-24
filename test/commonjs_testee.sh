#!/usr/bin/env sh

node ./test/commonjs.testee.js "$@" <&0 >&1 2>&2
