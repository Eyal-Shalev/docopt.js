export const VERSION = '0.6.0';

/**
 * @typedef {Object} Params
 * @property {string[]} [argv]
 * @property {boolean} [help]
 * @property {string} [version]
 * @property {boolean} [optionsFirst]
 */

/**
 * @type {Readonly<Params>}
 */
const defaultParams = Object.freeze({help: true, optionsFirst: false});

/**
 * @param doc {string}
 * @param init {Params}
 * @return {Object.<string, (null|boolean|number|string|string[])>}
 * @throws {Exit}
 */
const docopt = (doc, init = {}) => {
  const params = {...defaultParams, ...init};
  params.argv = params.argv || processArgv();
  Exit.usage = printableUsage(doc);
  const options = parseDefaults(doc);
  const pattern = parsePattern(formalUsage(Exit.usage), options);
  const argv = parseArgv(new TokenStream(params.argv, Exit), options, params.optionsFirst);
  const patternOptions = uniqueMap(pattern.flat(Option));
  pattern.flat(AnyOptions).forEach(ao => {
    const docOptions = parseDefaults(doc);
    ao.children = unique(docOptions.filter(o => !patternOptions.has(o.toString())));
  });
  extras(params.help, params.version, argv, doc);
  let [matched, left, collected] = pattern.fix().match(argv);
  collected = collected || [];
  if (matched && left && left.length === 0) {
    return Object.fromEntries(pattern.flat().concat(collected).map(a => [a.name, a.value]));
  }
  throw new Exit();
};
export default docopt;

/**
 * @param help {boolean}
 * @param version {string|undefined}
 * @param options {Option[]}
 * @param doc {string}
 * @throws {Exit}
 */
const extras = (help, version, options, doc) => {
  if (help && options.filter(o => ['-h', '--help'].includes(o.name)).length > 0) {
    Exit.usage = null;
    throw new Exit(doc.trim());
  }
  if (version && options.filter(o => o.name === '--version' && o.value).length > 0) {
    Exit.usage = null;
    throw new Exit(version);
  }
};

/**
 * @param doc {string}
 * @return {string}
 */
const printableUsage = (doc) => {
  const usageSplit = doc.split(/([Uu][Ss][Aa][Gg][Ee]:)/);
  if (usageSplit.length < 3) {
    throw new DocoptLanguageError('"usage:" (case-insensitive) not found.');
  }
  if (usageSplit.length > 3) {
    throw new DocoptLanguageError('More than one "usage:" (case-insensitive).');
  }
  return usageSplit.slice(1).join('').split(/\n\s*\n/)[0].trim();
};

/**
 * @param tokens {TokenStream}
 * @param options {Option[]}
 * @param optionsFirst {boolean}
 * @return {(Argument|Option)[]}
 */
const parseArgv = (tokens, options, optionsFirst = false) => {
  const parsed = [];
  while (tokens.current() !== null) {
    if (tokens.current() === '--') {
      return parsed.concat(tokens.map((v) => new Argument(null, v)));
    } else if (tokens.current().startsWith('--')) {
      parsed.push(...parseLong(tokens, options));
    } else if ((tokens.current().startsWith('-')) && tokens.current() !== '-') {
      parsed.push(...parseShorts(tokens, options));
    } else if (optionsFirst) {
      return parsed.concat(tokens.map((v) => new Argument(null, v)));
    } else {
      parsed.push(new Argument(null, tokens.move()));
    }
  }
  return parsed;
};

/**
 * @param doc {string}
 * @return {Option[]}
 */
const parseDefaults = (doc) => {
  let split = doc.split(/^ *(<\S+?>|-\S+?)/mg).slice(1);
  split = eachSlice(split, 2).filter(pair => pair.length === 2).map(([s1, s2]) => s1 + s2);
  return split.filter(s => s.startsWith('-')).map(s => Option.parse(s));
};

/**
 * @param printableUsage {string}
 * @return {string}
 */
const formalUsage = (printableUsage) => {
  const pu = printableUsage.split(/\s+/g).slice(1); // split and drop "usage:"
  const ret = [];
  for (let s of pu.slice(1)) {
    if (s === pu[0]) {
      ret.push(') | (');
    } else {
      ret.push(s);
    }
  }
  return `( ${ret.join(' ')} )`;
};

/**
 * @param tokens {TokenStream}
 * @param options {Option[]}
 * @return {[Option]}
 */
const parseLong = (tokens, options) => {
  let long, eq, value;
  [long, eq, value] = stringPartition(tokens.move(), '=');
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

/**
 * @param tokens {TokenStream}
 * @param options {Option[]}
 * @return {Option[]}
 */
const parseShorts = (tokens, options) => {
  const token = tokens.move();
  if (!token.startsWith('-') || token.startsWith('--')) {
    throw new Error('Invalid runtime state');
  }
  let left = token.substring(1);
  const parsed = [];
  while (left !== '') {
    let o;
    let short;
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

/**
 * @param source {string}
 * @param options {Option[]}
 * @return {Required}
 */
const parsePattern = (source, options) => {
  const tokens = new TokenStream(source.replace(/([\[\]\(\)\|]|\.\.\.)/g, ' $1 '), DocoptLanguageError);
  const result = parseExpr(tokens, options);
  if (tokens.current() != null) {
    throw new tokens.error(`unexpected ending: ${tokens.join(' ')}`);
  }
  return new Required(...result);
};

/**
 * @param tokens {TokenStream}
 * @param options {Option[]}
 * @return {Pattern[]}
 */
const parseExpr = (tokens, options) => {
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

/**
 * @param tokens {TokenStream}
 * @param options {Option[]}
 * @return {Pattern[]}
 */
const parseSeq = (tokens, options) => {
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

/**
 * @param tokens {TokenStream}
 * @param options {Option[]}
 * @return {Pattern[]}
 */
const parseAtom = (tokens, options) => {
  const token = tokens.current();
  let matching;
  let pattern;
  if (['(', '['].includes(token)) {
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
  } else if ((token.startsWith('--')) && token !== '--') {
    return parseLong(tokens, options);
  } else if ((token.startsWith('-')) && !['-', '--'].includes(token)) {
    return parseShorts(tokens, options);
  } else if ((token.startsWith('<')) && (token.endsWith('>')) || ((token.toUpperCase()) === token && (token.match(/[A-Z]/)))) {
    return [new Argument(tokens.move())];
  } else {
    return [new Command(tokens.move())];
  }
};

class DocoptLanguageError extends Error {
}

class Exit extends Error {
  /**
   * @param _message {string}
   */
  constructor(_message = '') {
    super();
    this._message = _message;
  }

  /**
   * @return {string}
   */
  get message() {
    return `${this._message}\n${Exit.usage || ''}`.trim();
  }

  /**
   * @type {string}
   */
  static usage = '';
}

class TokenStream extends Array {
  /**
   * @param source {string|string[]}
   * @param error {Function}
   */
  constructor(source = [], error) {
    super();
    this.error = error;
    if (typeof source === 'string') {
      source = source.trim().split(/\s+/g);
    }
    this.push(...source);
  }

  /**
   * @return {string|null}
   */
  move() {
    return this.shift();
  }

  /**
   * @return {string|null}
   */
  current() {
    return this.length > 0 ? this[0] : null;
  }
}

class Pattern {

  /**
   * @type {Pattern[]}
   */
  children;

  /**
   * @return {string}
   */
  toString() {
    return `${this.constructor.name}()`;
  }

  /**
   * @return {Pattern}
   */
  fix() {
    this.fixIdentities();
    this.fixRepeatingArguments();
    return this;
  }

  /**
   * @param types {...Function}
   * @return {Pattern[]}
   */
  flat(...types) {
    throw new TypeError('Unimplemented function');
  }

  /**
   * @param left {Pattern[]}
   * @param collected {Pattern[]}
   * @return {[boolean, Pattern[], Pattern[]]}
   */
  match(left, collected = []) {
    throw new TypeError('Unimplemented function');
  }

  /**
   * @return {Pattern}
   */
  fixIdentities(uniq) {
    if (!this.children) {
      return this;
    }
    uniq = uniq || uniqueMap(this.flat());
    for (let i in this.children) {
      if (this.children.hasOwnProperty(i)) {
        const c = this.children[i];
        if (!c.children) {
          if (!(uniq.has(c.toString()))) {
            throw new Error('Invalid runtime state');
          }
          this.children[i] = uniq.get(c.toString());
        } else {
          c.fixIdentities(uniq);
        }
      }
    }
    return this;
  }

  /**
   * @return {Pattern}
   */
  fixRepeatingArguments() {
    this.either().children.map(c => c.children).forEach(case_ => {
      case_.filter(c => c instanceof ChildPattern && case_.filter(x => c.equalTo(x)).length > 1).forEach(e => {
        if (e instanceof Argument || (e instanceof Option && e.argCount > 0)) {
          if (!e.value) {
            e.value = [];
          } else if (!(e.value instanceof Array)) {
            e.value = e.value.split(/\s+/g);
          }
        }
        if (e instanceof Command || (e instanceof Option && e.argCount === 0)) {
          e.value = 0;
        }
      });
    });
    return this;
  }

  /**
   * @return {Either}
   */
  either() {
    const ret = [];
    const groups = [[this]];
    while (groups.length > 0) {
      const children = groups.shift();
      const types = children.map(child => child.constructor);
      if (types.includes(Either)) {
        const i = children.findIndex(child => child instanceof Either);
        const either = children[i];
        children.splice(i, 1);
        for (let c of either.children) {
          groups.push([c, ...children]);
        }
      } else if (types.includes(Required)) {
        const i = children.findIndex(child => child instanceof Required);
        const required = children[i];
        children.splice(i, 1);
        groups.push(required.children.concat(children));
      } else if (types.includes(Optional)) {
        const i = children.findIndex(child => child instanceof Optional);
        const optional = children[i];
        children.splice(i, 1);
        groups.push(optional.children.concat(children));
      } else if (types.includes(AnyOptions)) {
        const i = children.findIndex(child => child instanceof AnyOptions);
        const anyOptions = children[i];
        children.splice(i, 1);
        groups.push(anyOptions.children.concat(children));
      } else if (types.includes(OneOrMore)) {
        const i = children.findIndex(child => child instanceof OneOrMore);
        const oneOrMore = children[i];
        children.splice(i, 1);
        groups.push([...oneOrMore.children, ...oneOrMore.children, ...children]);
      } else {
        ret.push(children);
      }
    }
    const args = ret.map(e => new Required(...e));
    return new Either(...args);
  }
}

class ChildPattern extends Pattern {

  /**
   * @param name {string|null}
   * @param value {string|null}
   */
  constructor(name, value = null) {
    super();
    this.name = name;
    this.value = value;
  }

  /**
   * @param other {*}
   * @return {boolean}
   */
  equalTo(other) {
    return other.constructor === this.constructor && this.name === other.name && this.value === other.value;
  }

  /**
   * @return {string}
   */
  toString() {
    return `${this.constructor.name}(${this.name}, ${this.value === null ? '' : this.value})`;
  }

  /**
   * @param types {...Function}
   * @return {Pattern[]}
   */
  flat(...types) {
    if (types.length === 0 || types.includes(this.constructor)) {
      return [this];
    }
    return [];
  }

  /**
   * @param left {Pattern[]}
   * @param collected {Pattern[]}
   * @return {[boolean, Pattern[], Pattern[]]}
   */
  match(left, collected = []) {
    const [pos, match] = this.singleMatch(left);
    if (!match) {
      return [false, left, collected];
    }
    left = [...left.slice(0, pos), ...left.slice(pos + 1)];
    const sameName = collected.filter(a => a.name === this.name);
    if (this.value instanceof Array || typeof this.value === 'number') {
      let increment;
      if (typeof this.value === 'number') {
        increment = 1;
      } else {
        increment = (typeof match.value === 'string') ? [match.value] : match.value;
      }
      if (sameName.length === 0) {
        match.value = increment;
        return [true, left, [...collected, match]];
      }
      if (increment instanceof Array) {
        sameName[0].value.push(...increment);
      } else {
        sameName[0].value += increment;
      }
      return [true, left, collected];
    }
    return [true, left, [...collected, match]];
  }
}

class Option extends ChildPattern {

  /**
   * @param short {string|null}
   * @param long {string|null}
   * @param argCount {number}
   * @param value {*}
   */
  constructor(short, long, argCount = 0, value = false) {
    super((long || short), value);
    this.short = short;
    this.long = long;
    this.argCount = argCount;
    if (![0, 1].includes(argCount)) {
      throw new Error('Invalid runtime state');
    }
    if (value === false && argCount > 0) {
      this.value = null;
    }
  }

  /**
   * @return {string}
   */
  toString() {
    return `Option(${this.short || ''}, ${this.long || ''}, ${this.argCount}, ${this.value !== null ? this.value : ''})`;
  }

  /**
   * @param optionDescription {string}
   * @return {Option}
   */
  static parse(optionDescription) {
    let short = null;
    let long = null;
    let argCount = 0;
    let value = false;
    let [options, , description] = stringPartition(optionDescription.trim(), '  ');
    options = options.replace(/,/g, ' ').replace(/=/g, ' ');
    for (let s of options.split(/\s+/g)) {
      if (s.startsWith('--')) {
        long = s;
      } else if (s.startsWith('-')) {
        short = s;
      } else {
        argCount = 1;
      }
    }
    if (argCount > 0) {
      const matched = description.match(/\[default: (.*)\]/i);
      if (matched && matched.length > 1) {
        value = matched[1];
      }
    }
    return new Option(short, long, argCount, value);
  }

  /**
   * @param left {Pattern[]}
   * @return {[number, ChildPattern]}
   */
  singleMatch(left) {
    for (let i = 0; i < left.length; i++) {
      const p = left[i];
      if (p instanceof ChildPattern && this.name === p.name) {
        return [i, p];
      }
    }
    return [-1, null];
  }
}

class Argument extends ChildPattern {

  /**
   * @param left {Pattern[]}
   * @return {[number, Argument]}
   */
  singleMatch(left) {
    for (let i = 0; i < left.length; i++) {
      const p = left[i];
      if (p instanceof Argument) {
        return [i, new Argument(this.name, p.value)];
      }
    }
    return [-1, null];
  }

  /**
   * @param class_ {Function}
   * @param source {string}
   * @return {Argument}
   */
  static parse(class_, source) {
    const name = source.match(/(<\S*?>)/)[0];
    const value = source.match(/\[default: (.*)\]/i);
    return new class_(name, (value ? value[0] : null));
  }
}

class Command extends Argument {
  /**
   * @param name {string}
   * @param value {boolean}
   */
  constructor(name, value = false) {
    super(name, value);
    this.name = name;
    this.value = value;
  }

  /**
   * @param left {Pattern[]}
   * @return {[number, Command]}
   */
  singleMatch(left) {
    for (let i = 0; i < left.length; i++) {
      const p = left[i];
      if (p instanceof Argument) {
        if (p.value === this.name) {
          return [i, new Command(this.name, true)];
        } else {
          break;
        }
      }
    }
    return [-1, null];
  }
}

class ParentPattern extends Pattern {

  /**
   * @param children {...Pattern}
   */
  constructor(...children) {
    super();
    this.children = children;
  }

  /**
   * @param types {...Function}
   * @return {Pattern[]}
   */
  flat(...types) {
    if (types.includes(this.constructor)) {
      return [this];
    } else {
      return this.children.flatMap(c => c.flat(...types));
    }
  }

  /**
   * @return {string}
   */
  toString() {
    return `${this.constructor.name}(${this.children.map(c => c.toString()).join(', ')})`;
  }
}

class Required extends ParentPattern {

  /**
   * @param left {Pattern[]}
   * @param collected {Pattern[]}
   * @return {[boolean, Pattern[], Pattern[]]}
   */
  match(left, collected = []) {
    let l = left;
    let [c, matched] = [collected, false];
    for (const p of this.children) {
      [matched, l, c] = p.match(l, c);
      if (!matched) {
        return [false, left, collected];
      }
    }
    return [true, l, c];
  }
}

class Optional extends ParentPattern {

  /**
   * @param left {Pattern[]}
   * @param collected {Pattern[]}
   * @return {[boolean, Pattern[], Pattern[]]}
   */
  match(left, collected = []) {
    for (const p of this.children) {
      [, left, collected] = p.match(left, collected);
    }
    return [true, left, collected];
  }
}

class AnyOptions extends Optional {
}

class OneOrMore extends ParentPattern {

  /**
   * @param left {Pattern[]}
   * @param collected {Pattern[]}
   * @return {[boolean, Pattern[], Pattern[]]}
   */
  match(left, collected = []) {
    if (this.children.length !== 1) {
      throw new Error('Invalid runtime state');
    }
    let [l, c, matched, times] = [left, collected, true, 0];
    let l_ = null;
    while (matched) {
      // could it be that something didn't match but changed l or c?
      [matched, l, c] = this.children[0].match(l, c);
      times += (matched ? 1 : 0);
      if (l_ === l) {
        break;
      }
      l_ = l;
    }
    if (times >= 1) {
      return [true, l, c];
    }
    return [false, left, collected];
  }
}

class Either extends ParentPattern {

  /**
   * @param left {Pattern[]}
   * @param collected {Pattern[]}
   * @return {[boolean, Pattern[], Pattern[]]}
   */
  match(left, collected = []) {
    const outcomes = [];
    for (const p of this.children) {
      const found = p.match(left, collected);
      if (found[0]) {
        outcomes.push(found);
      }
    }
    const outcomeSize = (outcome) => outcome[1] === null ? 0 : outcome[1].length;
    if (outcomes.length > 0) {
      return outcomes.sort((a, b) => outcomeSize(a) - outcomeSize(b))[0];
    }
    return [false, left, collected];
  }
}

/**
 * @param arr {T[]}
 * @return {Map<string, T>}
 * @template T
 */
const uniqueMap = (arr) => {
  const m = new Map();
  arr.forEach(t => m.has(t.toString()) || m.set(t.toString(), t));
  return m;
};

/**
 * @param arr {T[]}
 * @return {T[]}
 * @template T
 */
const unique = (arr) => {
  return Array.from(uniqueMap(arr).values());
};

/**
 * @param orig {T[]}
 * @param size {number}
 * @return {T[][]}
 * @template T
 */
const eachSlice = (orig, size) => {
  const arr = [];
  for (let i = 0, l = orig.length; i < l; i += size) {
    arr.push(orig.slice(i, i + size));
  }
  return arr;
};

/**
 * @param source {string}
 * @param expr {string}
 * @return {[string, string, string]}
 */
const stringPartition = (source, expr) => {
  const i = source.indexOf(expr);
  if (i < 0) {
    return [source, '', ''];
  }
  return [source.substring(0, i), expr, source.substring(i + expr.length)];
};

/**
 * @return {string[]}
 */
const processArgv = () => (typeof Deno !== 'undefined' && Deno.args) || (typeof process !== 'undefined' && process.argv.slice(2)) || [];
