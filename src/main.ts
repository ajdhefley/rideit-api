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
    await app.enableCors({
        credentials: true,
        origin: process.env.CLIENT_URL
    });
    // TODO: use reverse proxy for same port and no cross-origin

    app.listen(process.env.PORT || 4040, () => {
        Logger.log(`Server running on PORT ${process.env.PORT || 4040}`);
    });
})();
