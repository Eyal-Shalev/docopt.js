FROM alpine

RUN apk add --update python2 nodejs &&\
    rm -rf /var/cache/apk/*

ADD . /docopt.js
WORKDIR /docopt.js

ENTRYPOINT ["node"]
CMD ["test/commonjs.test.js"]
