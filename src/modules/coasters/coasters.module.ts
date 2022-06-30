import { Module } from '@nestjs/common';
import { CoasterController } from './controllers/coaster.controller';
import { CoasterService } from './services/coaster.service';

@Module({
  imports: [],
  controllers: [CoasterController],
  providers: [CoasterService],
})
export class CoastersModule {}
