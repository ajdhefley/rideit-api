import { Module } from '@nestjs/common';
import { CoasterController } from './coaster.controller';
import { CoasterImageResolver } from './resolvers/coaster-image.resolver';
import { CoasterResolver } from './resolvers/coaster.resolver';
import { CoasterImageService } from './services/coaster-image.service';
import { CoasterService } from './services/coaster.service';

@Module({
  imports: [],
  controllers: [
    CoasterController
  ],
  providers: [
    CoasterService,
    CoasterImageService,
    CoasterResolver,
    CoasterImageResolver
  ]
})
export class CoastersModule {}
