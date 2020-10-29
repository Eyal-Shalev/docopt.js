export class DocoptLanguageError extends Error {
}

export class Exit extends Error {
  constructor(private readonly _message: string = "") {
    super();
  }

  get message(): string {
    return `${this._message}\n${Exit.usage || ""}`.trim();
  }

  public static usage?: string;
}
