import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { WinstonLoggerService } from './infrastructure/logging/winston-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService(),
    cors: true
  });
  app.enableCors();
  await app.listen(4040);
}
bootstrap();
