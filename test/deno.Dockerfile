FROM hayd/deno:alpine-0.33.0

RUN apk add --update --no-cache python2

ADD . /docopt.js
WORKDIR /docopt.js

RUN deno fetch dist/docopt.mjs
ENTRYPOINT ["deno", "run", "--allow-run"]
CMD ["test/test.mjs"]
