import { ArgumentsHost, HttpException, ExceptionFilter, LoggerService } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
