FROM hayd/alpine-deno:1.0.0

RUN apk add --update --no-cache python2

ADD . /docopt.js
WORKDIR /docopt.js

RUN deno cache dist/docopt.mjs
ENTRYPOINT ["deno", "run", "--allow-run", "--allow-read=."]
CMD ["test/test.mjs"]
