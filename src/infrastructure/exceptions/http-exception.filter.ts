import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const type = host.getType();

        if (type === 'http') {
            host.switchToHttp()
                .getResponse<Response>()
                .status(status)
                .json({ message: error.message });
        } else {
            throw error;
        }
        
        Logger.error(`Status: ${status} | ${error.stack}`);
    }
}
