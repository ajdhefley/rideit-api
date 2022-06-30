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
  await app.listen(process.env.PORT);
})();
