import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        host.switchToHttp()
            .getResponse()
            .status(error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });

        Logger.error(`Status: ${error.getStatus() || error.name} | ${error.stack}`);
    }
}
