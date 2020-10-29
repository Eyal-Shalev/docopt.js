FROM hayd/alpine-deno:1.5.0

RUN apk add --update --no-cache python2

COPY . /docopt.js
WORKDIR /docopt.js

RUN deno cache test/deno_testee.ts
ENTRYPOINT ["deno", "run", "--allow-run", "--allow-read=."]
CMD ["test/deno_test.ts"]
