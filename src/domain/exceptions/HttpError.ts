export default class HttpError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
