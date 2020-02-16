const {execSync} = require('child_process');

const result = execSync('python test/language_agnostic_tester.py test/nodejs_testee.js').toString('utf-8');

console.log(result);
if (result.includes('F') || result.includes('J')) {
  process.exit(1);
}
