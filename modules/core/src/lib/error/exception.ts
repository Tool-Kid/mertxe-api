import { ExceptionType } from './exception-type';

interface ExceptionParams {
  message: string;
  type: ExceptionType;
}

export class Exception extends Error {
  readonly type: ExceptionType;
  constructor(params: ExceptionParams) {
    super(params.message);
    this.type = params.type;
  }

  get message() {
    return this.message;
  }
}
