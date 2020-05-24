import {TokenStream} from "./token.ts";
import {AnyOptions, Argument, Command, Either, OneOrMore, Option, Optional, Pattern, Required} from "./pattern.ts";
import {DocoptLanguageError, Exit} from "./error.ts";
import {eachSlice, stringPartition} from "./utils.ts";

export const parseArgv = (tokens: TokenStream, options: Option[], optionsFirst: Boolean = false): (Argument | Option)[] => {
  const parsed = [];
  while (tokens.current() !== null) {
    if (tokens.current() === '--') {
      return parsed.concat(tokens.next().map((v) => new Argument(null, v)));
    } else if (tokens.current()?.startsWith('--')) {
      parsed.push(...parseLong(tokens, options));
    } else if ((tokens.current()?.startsWith('-')) && tokens.current() !== '-') {
      parsed.push(...parseShorts(tokens, options));
    } else if (optionsFirst) {
      return parsed.concat(tokens.map((v) => new Argument(null, v)));
    } else {
      parsed.push(new Argument(null, tokens.move()));
    }
  }
  return parsed;
};
export const parseDefaults = (doc: string): Option[] => {
  let split = doc.split(/^ *(<\S+?>|-\S+?)/mg).slice(1);
  split = eachSlice(split, 2).filter(pair => pair.length === 2).map(([s1, s2]) => s1 + s2);
  return split.filter(s => s.startsWith('-')).map(s => Option.parse(s));
};
const parseLong = (tokens: TokenStream, options: Option[]): [Option] => {
  let long: string, eq: string, value: string | null;
  [long, eq, value] = stringPartition(tokens?.move() || '', '=');
  if (!long.startsWith('--')) {
    throw new Error('Invalid runtime state');
  }
  value = (eq === value && eq === '') ? null : value;
  let similar = options.filter(o => o.long && o.long === long);
  if (tokens.error === Exit && similar.length === 0) {
    similar = options.filter(o => o.long && o.long.startsWith(long));
  }
  let o;
  if (similar.length > 1) {
    const ostr = similar.map(o => o.long).join(', ');
    throw new tokens.error(`${long} is not a unique prefix: ${ostr}`);
  } else if (similar.length === 0) {
    const argCount = (eq === '=' ? 1 : 0);
    o = new Option(null, long, argCount);
    options.push(o);
    if (tokens.error === Exit) {
      o = new Option(null, long, argCount, (argCount === 1 ? value : true));
    }
  } else {
    const s0 = similar[0];
    o = new Option(s0.short, s0.long, s0.argCount, s0.value);
    if (o.argCount === 0) {
      if (value !== null) {
        throw new tokens.error(`${o.long} must not have an argument`);
      }
    } else {
      if (value === null) {
        if (tokens.current() === null) {
          throw new tokens.error(`${o.long} requires argument`);
        }
        value = tokens.move();
      }
    }
    if (tokens.error === Exit) {
      o.value = (value !== null ? value : true);
    }
  }
  return [o];
};
const parseShorts = (tokens: TokenStream, options: Option[]): Option[] => {
  const token = tokens.move();
  if (!token || !token.startsWith('-') || token.startsWith('--')) {
    throw new Error('Invalid runtime state');
  }
  let left = token?.substring(1);
  const parsed = [];
  while (left && left !== '') {
    let o: Option;
    let short: string;
    [short, left] = ['-' + left[0], left.substring(1)];
    const similar = options.filter(o => o.short === short);
    if (similar.length > 1) {
      throw new tokens.error(`${short} is specified ambiguously ${similar.length} times`);
    } else if (similar.length === 0) {
      o = new Option(short, null, 0);
      options.push(o);
      if (tokens.error === Exit) {
        o = new Option(short, null, 0, true);
      }
    } else {
      const s0 = similar[0];
      o = new Option(short, s0.long, s0.argCount, s0.value);
      let value = null;
      if (o.argCount !== 0) {
        if (left === '') {
          if (tokens.current() === null) {
            throw new tokens.error(`${short} requires argument`);
          }
          value = tokens.move();
        } else {
          value = left;
          left = '';
        }
      }
      if (tokens.error === Exit) {
        o.value = (value !== null ? value : true);
      }
    }
    parsed.push(o);
  }
  return parsed;
};
export const parsePattern = (source: string, options: Option[]): Required => {
  const tokens = new TokenStream(source.replace(/([\[\]\(\)\|]|\.\.\.)/g, ' $1 '), DocoptLanguageError);
  const result = parseExpr(tokens, options);
  if (tokens.current() != null) {
    throw new tokens.error(`unexpected ending: ${tokens.join(' ')}`);
  }
  return new Required(...result);
};
const parseExpr = (tokens: TokenStream, options: Option[]): Pattern[] => {
  let seq = parseSeq(tokens, options);
  if (tokens.current() !== '|') {
    return seq;
  }
  let result = seq.length > 1 ? [new Required(...seq)] : seq;
  while (tokens.current() === '|') {
    tokens.move();
    seq = parseSeq(tokens, options);
    result = result.concat(seq.length > 1 ? [new Required(...seq)] : seq);
  }
  return result.length > 1 ? [new Either(...result)] : result;
};
const parseSeq = (tokens: TokenStream, options: Option[]): Pattern[] => {
  const result = [];
  const stop = [undefined, null, ']', ')', '|'];
  while (!stop.includes(tokens.current())) {
    let atom = parseAtom(tokens, options);
    if (tokens.current() === '...') {
      atom = [new OneOrMore(...atom)];
      tokens.move();
    }
    result.push(...atom);
  }
  return result;
};
const parseAtom = (tokens: TokenStream, options: Option[]): Pattern[] => {
  const token = tokens.current();
  let matching;
  let pattern;
  if ((['(', '['] as any[]).includes(token)) {
    tokens.move();
    if (token === '(') {
      matching = ')';
      pattern = Required;
    } else {
      matching = ']';
      pattern = Optional;
    }
    let result = new pattern(...parseExpr(tokens, options));
    if (tokens.move() !== matching) {
      throw new tokens.error(`unmatched '${token}'`);
    }
    return [result];
  } else if (token === 'options') {
    tokens.move();
    return [new AnyOptions()];
  } else if ((token?.startsWith('--')) && token !== '--') {
    return parseLong(tokens, options);
  } else if ((token?.startsWith('-')) && !['-', '--'].includes(token)) {
    return parseShorts(tokens, options);
  } else if ((token?.startsWith('<')) && (token.endsWith('>')) || ((token?.toUpperCase()) === token && (token.match(/[A-Z]/)))) {
    return [new Argument(tokens.move() as string)];
  } else {
    return [new Command(tokens.move() as string)];
  }
};
