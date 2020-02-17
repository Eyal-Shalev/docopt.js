import docopt from "../src/docopt.mjs";
const doc = `
Usage:
  ${import.meta.url} tcp <host> <port> [--timeout=<seconds>]
  ${import.meta.url} serial <port> [--baud=9600] [--timeout=<seconds>]
  ${import.meta.url} -h | --help | --version

`;
try {
    console.log(JSON.stringify(docopt(doc), null, '\t'));
}
catch (e) {
    console.error(e.message);
}
