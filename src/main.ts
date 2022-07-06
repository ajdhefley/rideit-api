import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { WinstonLoggerService } from './infrastructure/logging/winston-logger.service';

(async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule, {
        logger: new WinstonLoggerService(),
        cors: true
    });

    await app.enableCors();
    
    app.listen(process.env.PORT, () => {
        console.info(`%c Server running on PORT ${process.env.PORT}`);
    });
})();
