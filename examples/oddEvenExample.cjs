const docopt = require('@eyalsh/docopt').default;

const doc = `
Usage: ${__filename} [-h | --help] (ODD EVEN)...

Example, try:
  ${__filename} 1 2 3 4

Options:
  -h, --help

`;
try {
  console.log(JSON.stringify(docopt(doc), null, '\t'));
} catch (e) {
  console.error(e.message);
}
