
declare interface Params {
  argv?: string[]
  help?: boolean
  version?: string
  optionsFirst?: boolean
}

declare function docopt(doc: string, init: Params): {[k:string]:(null|boolean|number|string|string[])};
