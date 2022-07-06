import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { WinstonLoggerService } from './infrastructure/logging/winston-logger.service';
import { Logger } from '@nestjs/common';

(async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new WinstonLoggerService(),
        cors: true
    });

    await app.enableCors();

    app.listen(process.env.PORT || 4040, () => {
        Logger.log(`Server running on PORT ${process.env.PORT || 4040}`);
    });
})();
