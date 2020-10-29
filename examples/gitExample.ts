import docopt from "../mod.ts";

const doc = `
Usage:
    ${import.meta.url} remote [-v | --verbose]
    ${import.meta.url} remote add [-t <branch>] [-m <master>] [-f]
                   [--tags|--no-tags] [--mirror] <name> <url>
    ${import.meta.url} remote rename <old> <new>
    ${import.meta.url} remote rm <name>
    ${import.meta.url} remote set-head <name> (-a | -d | <branch>)
    ${import.meta.url} remote set-branches <name> [--add] <branch>...
    ${import.meta.url} remote set-url [--push] <name> <newurl> [<oldurl>]
    ${import.meta.url} remote set-url --add [--push] <name> <newurl>
    ${import.meta.url} remote set-url --delete [--push] <name> <url>
    ${import.meta.url} remote [-v | --verbose] show [-n] <name>
    ${import.meta.url} remote prune [-n | --dry-run] <name>
    ${import.meta.url} remote [-v | --verbose] update [-p | --prune]
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
} catch (e) {
  console.error(e.message);
}
