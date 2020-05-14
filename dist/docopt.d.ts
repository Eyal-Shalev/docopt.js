export declare const VERSION = "1.0.1";
declare type Value = null | boolean | number | string | string[];
export declare type DocOptions = {
    [k: string]: Value;
};
interface Params {
    argv?: string[];
    help?: boolean;
    version?: string;
    optionsFirst?: boolean;
}
declare const docopt: (doc: string, init?: Params) => DocOptions;
export default docopt;
