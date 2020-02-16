import docopt from "../src/docopt.mjs";
const doc = `
Usage: ${import.meta.url} [-h | --help] (ODD EVEN)...

Example, try:
  ${import.meta.url} 1 2 3 4

Options:
  -h, --help

`;
try {
    console.log(JSON.stringify(docopt(doc), null, '\t'));
}
catch (e) {
    console.error(e.message);
}
