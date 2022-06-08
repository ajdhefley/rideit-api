import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        Logger.log(`${req.ip} Inbound Request: ${req.method} \"${req.baseUrl}\"`);
        next();
    }
}
