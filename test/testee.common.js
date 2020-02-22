const fs = require('fs');
const {default: docopt} = require('../commonjs/docopt.js');

const doc = fs.readFileSync(0, 'utf-8');

try {
    console.log(JSON.stringify(docopt(doc)));
} catch(e) {
    console.log('"user-error"');
}
