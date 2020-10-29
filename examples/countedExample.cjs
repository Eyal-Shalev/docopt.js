const docopt = require('@eyalsh/docopt').default;

const doc = `
Usage: ${__filename} --help
       ${__filename} -v...
       ${__filename} go [go]
       ${__filename} (--path=<path>)...
       ${__filename} <file> <file>

Try: ${__filename} -vvvvvvvvvv
     ${__filename} go go
     ${__filename} --path ./here --path ./there
     ${__filename} this.txt that.txt

`;
try {
  console.log(JSON.stringify(docopt(doc), null, '\t'));
} catch (e) {
  console.error(e.message);
}
