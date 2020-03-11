import docopt from "../dist/docopt.mjs";

const doc = `
Naval Fate.

Usage:
  ${import.meta.url} ship new <name>...
  ${import.meta.url} ship <name> move <x> <y> [--speed=<kn>]
  ${import.meta.url} ship shoot <x> <y>
  ${import.meta.url} mine (set|remove) <x> <y> [--moored|--drifting]
  ${import.meta.url} -h | --help
  ${import.meta.url} --version

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
