import {flatten} from "./pollyfill.ts";
import {Constructor, stringPartition, uniqueMap, Value} from "./utils.ts";

type MatchResult = [boolean, Pattern[], ChildPattern[]];

export abstract class Pattern {

  children?: Pattern[];

  toString(): string {
    return `${this.constructor.name}()`;
  }

  fix(): this {
    this.fixIdentities();
    this.fixRepeatingArguments();
    return this;
  }

  abstract flat(...types: Constructor<Pattern>[]): Pattern[];

  abstract match(left: Pattern[], collected: ChildPattern[]): MatchResult;

  fixIdentities(uniq?: Map<string, Pattern>): Pattern {
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
          this.children = this.children || [];
          this.children[i] = uniq.get(c.toString()) as Pattern;
        } else {
          c.fixIdentities(uniq);
        }
      }
    }
    return this;
  }

  fixRepeatingArguments(): this {
    this.either().children.map(c => c.children).forEach(case_ => {
      case_?.filter(c => c instanceof ChildPattern && case_.filter(x => c.equalTo(x)).length > 1).forEach(e => {
        if (e instanceof Argument || (e instanceof Option && e.argCount > 0)) {
          if (!e.value) {
            e.value = [];
          } else if (typeof e.value === 'string') {
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

  either(): Either {
    const ret = [];
    const groups: Pattern[][] = [[this]];
    while (groups.length > 0) {
      const children = groups.shift() as Pattern[];
      const types = children.map(child => child.constructor);
      if (types.includes(Either)) {
        const i = children.findIndex(child => child instanceof Either);
        const either = children[i] as Either;
        children.splice(i, 1);
        for (let c of either.children) {
          groups.push([c, ...children]);
        }
      } else if (types.includes(Required)) {
        const i = children.findIndex(child => child instanceof Required);
        const required = children[i] as Required;
        children.splice(i, 1);
        groups.push(required.children.concat(children));
      } else if (types.includes(Optional)) {
        const i = children.findIndex(child => child instanceof Optional);
        const optional = children[i] as Optional;
        children.splice(i, 1);
        groups.push(optional.children.concat(children));
      } else if (types.includes(AnyOptions)) {
        const i = children.findIndex(child => child instanceof AnyOptions);
        const anyOptions = children[i] as AnyOptions;
        children.splice(i, 1);
        groups.push(anyOptions.children.concat(children));
      } else if (types.includes(OneOrMore)) {
        const i = children.findIndex(child => child instanceof OneOrMore);
        const oneOrMore = children[i] as OneOrMore;
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

export abstract class ChildPattern extends Pattern {

  public children: undefined;

  constructor(public name: string | null, public value: Value = null) {
    super();
  }

  equalTo(other: any): boolean {
    return other === this || (other.constructor === this.constructor && this.name === other.name && this.value === other.value);
  }

  toString(): string {
    return `${this.constructor.name}(${this.name}, ${this.value === null ? '' : this.value})`;
  }

  flat(...types: Constructor<Pattern>[]): Pattern[] {
    if (types.length === 0 || types.includes(this.constructor as Constructor<Pattern>)) {
      return [this];
    }
    return [];
  }

  abstract singleMatch(left: Pattern[]): ([number, ChildPattern] | [-1, null]);

  match(left: Pattern[], collected: ChildPattern[] = []): MatchResult {
    const [pos, match] = this.singleMatch(left);
    if (!match) {
      return [false, left, collected];
    }
    left = [...left.slice(0, pos), ...left.slice(pos + 1)];
    const sameName = collected.filter(a => a instanceof ChildPattern && a.name === this.name) as ChildPattern[];
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
      if (increment instanceof Array && sameName[0].value instanceof Array) {
        sameName[0].value.push(...increment);
      } else if (!!increment && typeof sameName[0].value === 'number' && typeof increment === 'number') {
        sameName[0].value += increment;
      } else {
        throw new Error('Invalid runtime state');
      }
      return [true, left, collected];
    }
    return [true, left, [...collected, match]];
  }
}

export class Option extends ChildPattern {

  constructor(public short: string | null, public long: string | null, public argCount: number = 0, value: Value = false) {
    super((long || short), value);
    if (![0, 1].includes(argCount)) {
      throw new Error('Invalid runtime state');
    }
    if (value === false && argCount > 0) {
      this.value = null;
    }
  }

  toString(): string {
    return `Option(${this.short || ''}, ${this.long || ''}, ${this.argCount}, ${this.value !== null ? this.value : ''})`;
  }

  static parse(optionDescription: string): Option {
    let short = null;
    let long = null;
    let argCount = 0;
    let value: string | false = false;
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

  singleMatch(left: Pattern[]): ([number, ChildPattern] | [-1, null]) {
    for (let i = 0; i < left.length; i++) {
      const p = left[i];
      if (p instanceof ChildPattern && this.name === p.name) {
        return [i, p];
      }
    }
    return [-1, null];
  }
}

export class Argument extends ChildPattern {

  singleMatch(left: Pattern[]): ([number, Argument] | [-1, null]) {
    for (let i = 0; i < left.length; i++) {
      const p = left[i];
      if (p instanceof Argument) {
        return [i, new Argument(this.name, p.value)];
      }
    }
    return [-1, null];
  }

  static parse(class_: Constructor<Argument>, source: string): Argument {
    const name = source.match(/(<\S*?>)/)?.[0];
    const value = source.match(/\[default: (.*)\]/i);
    return new class_(name, (value ? value[0] : null));
  }
}

export class Command extends Argument {

  constructor(public name: string, value: boolean = false) {
    super(name, value);
  }

  singleMatch(left: Pattern[]): ([number, Command] | [-1, null]) {
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

export abstract class ParentPattern extends Pattern {

  public children: Pattern[] = [];

  constructor(...children: Pattern[]) {
    super();
    this.children = children;
  }

  flat<T extends Pattern = Pattern>(...types: Constructor<Pattern>[]): T[] {
    if (types.includes(this.constructor as Constructor<T>)) {
      return [this as any as T];
    } else {
      return flatten(this.children.map((c: Pattern) => c.flat(...types)));
    }
  }

  toString(): string {
    return `${this.constructor.name}(${this.children.map(c => c.toString()).join(', ')})`;
  }
}

export class Required extends ParentPattern {

  match(left: Pattern[], collected: ChildPattern[] = []): MatchResult {
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

export class Optional extends ParentPattern {

  match(left: Pattern[], collected: ChildPattern[] = []): MatchResult {
    for (const p of this.children) {
      [, left, collected] = p.match(left, collected);
    }
    return [true, left, collected];
  }
}

export class AnyOptions extends Optional {
}

export class OneOrMore extends ParentPattern {

  match(left: Pattern[], collected: ChildPattern[] = []): MatchResult {
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

export class Either extends ParentPattern {

  match(left: Pattern[], collected: ChildPattern[] = []): MatchResult {
    const outcomes: MatchResult[] = [];
    for (const p of this.children) {
      const found = p.match(left, collected);
      if (found[0]) {
        outcomes.push(found);
      }
    }
    const outcomeSize = (outcome: MatchResult) => outcome[1] === null ? 0 : outcome[1].length;
    if (outcomes.length > 0) {
      return outcomes.sort((a, b) => outcomeSize(a) - outcomeSize(b))[0];
    }
    return [false, left, collected];
  }
}
