import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  LoggerService,
} from '@nestjs/common';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    this.logger.error(exception.message, exception.stack);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      // path: request.url,
      method: request.method,
      message: exception.message || exception.name,
    });
    // console.log('exception.response', exception.response);
    // console.log('exception.response.message', exception.response.message);
    // console.log('exception.response.error', exception.response.error);
    // console.log('exception.response.errorCode', exception.response.errorCode);
    // console.log('exception.response.message', exception.response.message);
  }
}
