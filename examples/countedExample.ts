import docopt from "../mod.ts";

const doc = `
Usage: ${import.meta.url} --help
       ${import.meta.url} -v...
       ${import.meta.url} go [go]
       ${import.meta.url} (--path=<path>)...
       ${import.meta.url} <file> <file>

Try: ${import.meta.url} -vvvvvvvvvv
     ${import.meta.url} go go
     ${import.meta.url} --path ./here --path ./there
     ${import.meta.url} this.txt that.txt

`;
try {
  console.log(JSON.stringify(docopt(doc), null, '\t'));
} catch (e) {
  console.error(e.message);
}
