import { Test, TestingModule } from '@nestjs/testing';
import { CoasterController } from './coaster.controller';
import { CoasterService } from '../services/coaster.service';

describe('CoasterController', () => {
  let coasterController: CoasterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoasterController],
      providers: [CoasterService],
    }).compile();

    coasterController = app.get<CoasterController>(CoasterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(coasterController.getHello()).toBe('Hello World!');
    });
  });
});
