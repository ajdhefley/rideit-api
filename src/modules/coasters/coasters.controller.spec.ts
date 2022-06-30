import { Test, TestingModule } from '@nestjs/testing';
import { CoastersController } from './coasters.controller';
import { CoasterService } from './services/coaster.service';

describe('CoastersController', () => {
  let coasterController: CoastersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoastersController],
      providers: [CoasterService],
    }).compile();

    coasterController = app.get<CoastersController>(CoastersController);
  });
});
