FROM alpine

RUN apk add --update python2 nodejs &&\
    rm -rf /var/cache/apk/*

COPY . /docopt.js
WORKDIR /docopt.js

ENTRYPOINT ["node"]
CMD ["test/commonjs_test.js"]
