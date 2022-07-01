import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        console.error(error);
        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        host.switchToHttp()
            .getResponse()
            .status(status)
            .json({ message: error.message });

        Logger.error(`Status: ${status} | ${error.stack}`);
    }
}
