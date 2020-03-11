const docopt = require('docopt').default;

const doc = `
Usage:
  ${__filename} tcp <host> <port> [--timeout=<seconds>]
  ${__filename} serial <port> [--baud=9600] [--timeout=<seconds>]
  ${__filename} -h | --help | --version

`;
try {
    console.log(JSON.stringify(docopt(doc), null, '\t'));
}
catch (e) {
    console.error(e.message);
}
