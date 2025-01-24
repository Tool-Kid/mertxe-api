import { Exception } from '../exception';
import { ExceptionType } from '../exception-type';

export class InvalidOperationException extends Exception {
  constructor(message: string) {
    super({ message, type: ExceptionType.INVALID_OPERATION });
  }
}
