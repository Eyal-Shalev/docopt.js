FROM alpine

RUN apk add --update python2 nodejs &&\
    rm -rf /var/cache/apk/*

ADD . /docopt.js
WORKDIR /docopt.js

ENV NODE_OPTIONS='--no-warnings --experimental-modules'

ENTRYPOINT ["node"]
CMD ["test/test.mjs"]
