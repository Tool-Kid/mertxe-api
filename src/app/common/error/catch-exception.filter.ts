import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Type,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionType } from './exception-type';
import { Exception } from './exception';

const EXCEPTIONS_MAP = new Map<ExceptionType, Type<HttpException>>([
  [ExceptionType.INVALID_OPERATION, BadRequestException],
  [ExceptionType.RESOURCE_NOT_FOUND, NotFoundException],
]);

@Catch(Exception)
export class CatchExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Exception, host: ArgumentsHost): void {
    const httpException = EXCEPTIONS_MAP.get(exception.type);
    const { httpAdapter } = this.httpAdapterHost;

    if (!httpException) {
      throw new InternalServerErrorException();
    }

    const ctx = host.switchToHttp();
    const ex = new httpException();

    const responseBody = {
      message: ex.message,
      error: exception.message,
      statusCode: ex.getStatus(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, ex.getStatus());
  }
}
