import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsMiddleware implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const defaultValues = {
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
    };

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = defaultValues[HttpStatus.INTERNAL_SERVER_ERROR];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    const responseBody = {
      status,
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
