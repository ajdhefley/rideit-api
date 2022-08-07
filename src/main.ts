import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WinstonLoggerService } from './infrastructure/logging/winston-logger.service';
import { AppModule } from './modules/app.module';
import { Configuration } from './infrastructure/configuration';

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(Configuration);

    await app.use(cookieParser());
    await app.useLogger(new WinstonLoggerService(config));

    app.listen(config.port, config.host, () => {
        Logger.log(`Server running on HOST=${config.host} PORT=${config.port}`);
    });
})();
