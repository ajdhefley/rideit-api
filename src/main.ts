import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WinstonLoggerService } from './infrastructure/logging/winston-logger.service';
import { AppModule } from './modules/app.module';

(async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new WinstonLoggerService()
    });

    await app.use(cookieParser());

    app.listen(process.env.PORT || 4040, process.env.HOST, () => {
        Logger.log(`Server running on HOST=${process.env.HOST} PORT=${process.env.PORT || 4040}`);
    });
})();
