import { Module } from '@nestjs/common';
import { CoastersController } from './coasters.controller';
import { CoasterImageResolver } from './resolvers/coaster-image.resolver';
import { CoasterResolver } from './resolvers/coaster.resolver';
import { CoasterImageService } from './services/coaster-image.service';
import { CoasterService } from './services/coaster.service';

@Module({
  imports: [],
  controllers: [
    CoastersController
  ],
  providers: [
    CoasterService,
    CoasterImageService,
    CoasterResolver,
    CoasterImageResolver
  ]
})
export class CoastersModule {}
