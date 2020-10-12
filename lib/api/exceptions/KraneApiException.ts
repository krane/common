export class KraneApiException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KraneApiException";
    this.stack = new Error().stack;
  }
}
