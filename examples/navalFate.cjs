const docopt = require('docopt').default;

const doc = `
Naval Fate.

Usage:
  ${__filename} ship new <name>...
  ${__filename} ship <name> move <x> <y> [--speed=<kn>]
  ${__filename} ship shoot <x> <y>
  ${__filename} mine (set|remove) <x> <y> [--moored|--drifting]
  ${__filename} -h | --help
  ${__filename} --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  --speed=<kn>  Speed in knots [default: 10].
  --moored      Moored (anchored) mine.
  --drifting    Drifting mine.

`;
try {
    console.log(JSON.stringify(docopt(doc), null, '\t'));
}
catch (e) {
    console.error(e.message);
}
