/*
 * Copyright (c) 2020 Eyal Shalev <eyalsh@gmail.com>
 */

import {processArgv} from "./interoperability.ts";
import { DocoptLanguageError, Exit } from "./error.ts";
import { unique, uniqueMap, Value } from "./utils.ts";
import { AnyOptions, ChildPattern, Option } from "./pattern.ts";
import { TokenStream } from "./token.ts";
import { parseArgv, parseDefaults, parsePattern } from "./parse.ts";

export const VERSION = "1.0.7";

export type DocOptions = { [k: string]: Value };

interface Params {
  argv?: string[];
  help?: boolean;
  version?: string;
  optionsFirst?: boolean;
}

const defaultParams = Object.freeze({ help: true, optionsFirst: false });

const docopt = (doc: string, init: Params = {}): DocOptions => {
  const params = { ...defaultParams, ...init };
  params.argv = params.argv || processArgv();
  Exit.usage = printableUsage(doc);
  const options = parseDefaults(doc);
  const pattern = parsePattern(formalUsage(Exit.usage || ""), options);
  const argv = parseArgv(
    new TokenStream(params.argv, Exit),
    options,
    params.optionsFirst,
  );
  const patternOptions = uniqueMap(pattern.flat(Option));
  pattern.flat<AnyOptions>(AnyOptions).forEach((ao) => {
    const docOptions = parseDefaults(doc);
    ao.children = unique(
      docOptions.filter((o) => !patternOptions.has(o.toString())),
    );
  });
  extras(
    params.help,
    params.version,
    argv.filter((x) => x instanceof Option) as Option[],
    doc,
  );
  let [matched, left, collected] = pattern.fix().match(argv);
  collected = collected || [];
  if (matched && left && left.length === 0) {
    return Object.fromEntries(
      (pattern.flat() as ChildPattern[]).concat(collected).map<[string, Value]>(
        (a) => [a.name as string, a.value]
      ),
    );
  }
  throw new Exit();
};
export default docopt;

const extras = (
  help: boolean,
  version: string | undefined,
  options: Option[],
  doc: string,
): void => {
  if (
    help &&
    options.filter((o) => (["-h", "--help"] as any[]).includes(o.name)).length >
      0
  ) {
    Exit.usage = undefined;
    throw new Exit(doc.trim());
  }
  if (
    version &&
    options.filter((o) => o.name === "--version" && o.value).length > 0
  ) {
    Exit.usage = undefined;
    throw new Exit(version);
  }
};

const printableUsage = (doc: string): string => {
  const usageSplit = doc.split(/([Uu][Ss][Aa][Gg][Ee]:)/);
  if (usageSplit.length < 3) {
    throw new DocoptLanguageError('"usage:" (case-insensitive) not found.');
  }
  if (usageSplit.length > 3) {
    throw new DocoptLanguageError('More than one "usage:" (case-insensitive).');
  }
  return usageSplit.slice(1).join("").split(/\n\s*\n/)[0].trim();
};

const formalUsage = (printableUsage: string): string => {
  const pu = printableUsage.split(/\s+/g).slice(1); // split and drop "usage:"
  const ret = [];
  for (let s of pu.slice(1)) {
    if (s === pu[0]) {
      ret.push(") | (");
    } else {
      ret.push(s);
    }
  }
  return `( ${ret.join(" ")} )`;
};
