const docopt = require('@eyalsh/docopt').default;

const doc = `
Usage:
    ${__filename} remote [-v | --verbose]
    ${__filename} remote add [-t <branch>] [-m <master>] [-f]
                   [--tags|--no-tags] [--mirror] <name> <url>
    ${__filename} remote rename <old> <new>
    ${__filename} remote rm <name>
    ${__filename} remote set-head <name> (-a | -d | <branch>)
    ${__filename} remote set-branches <name> [--add] <branch>...
    ${__filename} remote set-url [--push] <name> <newurl> [<oldurl>]
    ${__filename} remote set-url --add [--push] <name> <newurl>
    ${__filename} remote set-url --delete [--push] <name> <url>
    ${__filename} remote [-v | --verbose] show [-n] <name>
    ${__filename} remote prune [-n | --dry-run] <name>
    ${__filename} remote [-v | --verbose] update [-p | --prune]
                   [(<group> | <remote>)...]

Options:
    -v, --verbose
    -t <branch>
    -m <master>
    -f
    --tags
    --no-tags
    --mittor
    -a
    -d
    -n, --dry-run
    -p, --prune
    --add
    --delete
    --push
    --mirror

`;
try {
    console.log(JSON.stringify(docopt(doc), null, '\t'));
}
catch (e) {
    console.error(e.message);
}
