import {
  ExceptionFilter,
  Catch,
  HttpException,
  BadRequestException,
  Type,
  InternalServerErrorException,
} from '@nestjs/common';
import { Exception } from './exception';
import { ExceptionType } from './exception-type';

const EXCEPTIONS_MAP = new Map<ExceptionType, Type<HttpException>>([
  [ExceptionType.INVALID_OPERATION, BadRequestException],
]);

@Catch(Exception)
export class CatchExceptionFilter implements ExceptionFilter {
  catch(exception: Exception): void {
    const httpException = EXCEPTIONS_MAP.get(exception.type);

    if (!httpException) {
      throw new InternalServerErrorException();
    }

    throw new httpException(exception.message);
  }
}
