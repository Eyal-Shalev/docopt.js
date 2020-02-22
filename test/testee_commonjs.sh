#!/usr/bin/env sh

node ./test/testee.common.js "$@" <&0 >&1 2>&2
