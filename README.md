# `docopt.js` – command line option parser, that will make you smile
[![docopt.js v1.0.0](https://img.shields.io/github/package-json/v/Eyal-Shalev/docopt.js?label=docopt.js)](https://github.com)
[![Build Status](https://travis-ci.org/eyal-shalev/docopt.js.svg?branch=master)](https://travis-ci.org/Eyal-Shalev/docopt.js)
[![node >= 10.3.0](https://img.shields.io/badge/node-%3E%3D%2010.3.0-brightgreen)](https://nodejs.org/)
[![deno >= 0.33.0](https://img.shields.io/badge/deno-%3E%3D0.33.0-black)](https://deno.land/)
[![on npm](https://img.shields.io/npm/dw/@eyalsh/docopt)](https://npmjs.com/package/@eyalsh/docopt)

This is the javascript port of [`docopt`](https://github.com/docopt/docopt),
the awesome option parser written originally in python.

Isn't it awesome how `yargs` and `commander` generate help messages
based on your code?!

*Hell no!*  You know what's awesome?  It's when the option parser *is* generated
based on the beautiful help message that you write yourself!  This way
you don't need to write this stupid repeatable parser-code, and instead can
write only the help message--*the way you want it*.

`docopt` helps you create most beautiful command-line interfaces *easily*:

## Example: Naval Fate

### ECMA Modules
```javascript
import docopt from "./dist/docopt.mjs";
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
```

### CommonJS modules
```javascript
const docopt = require('@eyalsh/docopt').default;

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
```

Beat that! The option parser is generated based on the docstring above that is
passed to `docopt` function.  `docopt` parses the usage pattern
(`Usage: ...`) and option descriptions (lines starting with dash "`-`") and
ensures that the program invocation matches the usage pattern; it parses
options, arguments and commands based on that. The basic idea is that
*a good help message has all necessary information in it to make a parser*.

## Installation

### ECMA
Docopt is available via JavaScript import:

    import docopt from "https://raw.githubusercontent.com/docopt/docopt.js/master/dist/docopt.mjs"

Alternatively, you can just drop `dist/docopt.mjs` file into your project - it is self-contained.
[Get source on github](http://github.com/eyal-shalev/docopt.js).

### NPM
Docopt is available via npm:

    npm install --save @eyalsh/docopt

## API

`Docopt` takes 1 required and 1 optional argument:

- `doc` should be a string that
describes **options** in a human-readable format, that will be parsed to create
the option parser.  The simple rules of how to write such a docstring
(in order to generate option parser from it successfully) are given in the next
section. Here is a quick example of such a string:

        Usage: your_program [options]

        -h --help     Show this.
        -v --verbose  Print more text.
        --quiet       Print less text.
        -o FILE       Specify output file [default: ./test.txt].


The optional second argument contains a hash of additional data to influence
docopt. The following keys are supported: 

- `help`, by default `true`, specifies whether the parser should automatically
print the usage-message (supplied as `doc`) in case `-h` or `--help` options
are encountered. After showing the usage-message, the program will terminate.
If you want to handle `-h` or `--help` options manually (as all other options),
set `help=false`.

- `version`, by default `undefined`, is an optional argument that specifies the
version of your program. If supplied, then, if the parser encounters
`--version` option, it will print the supplied version and terminate.
`version` could be any printable object, but most likely a string,
e.g. `'2.1.0rc1'`.

Note, when `docopt` is set to automatically handle `-h`, `--help` and
`--version` options, you still need to mention them in the options description
(`doc`) for your users to know about them.

The **return** value is just an object with options, arguments and commands,
with keys spelled exactly like in a help message
(long versions of options are given priority). For example, if you invoke
the top example as:
```sh
naval_fate ship Guardian move 100 150 --speed=15
```
the return object will be:

```json
{
    "ship": true,
    "new": false,
    "<name>": ["Guardian"],
    "move": true,
    "<x>": "100",
    "<y>": "150",
    "--speed": "15",
    "shoot": false,
    "mine": false,
    "set": false,
    "remove": false,
    "--moored": false,
    "--drifting": false,
    "--help": false,
    "--version": false
}
```

## Help message format

`docopt.js` follows the docopt help message format.
You can find more details at
[official docopt git repo](https://github.com/docopt/docopt#help-message-format)


## Examples

We have an extensive list of
[examples](https://github.com/docopt/docopt.js/tree/master/examples)
which cover every aspect of functionality of `docopt`.  Try them out,
read the source if in doubt.

## Contribution

We would *love* to hear what you think about `docopt.js`.
Contribute, make pull requests, report bugs, suggest ideas and discuss
`docopt.js` on
[issues page](http://github.com/eyal-shalev/docopt.js/issues).

If you want to discuss the original `docopt` reference,
point to [it's home](http://github.com/docopt/docopt)

## Porting `docopt` to other languages

Docopt is an interlinguistic (?) effort,
and this is the JavaScript port of `docopt`.
We coordinate our efforts with docopt community and try our best to
keep in sync with the python reference.

Docopt community *loves* to hear what you think about `docopt`, `docopt.js`
and other sister projects on docopt's
[issues page](http://github.com/docopt/docopt/issues).
