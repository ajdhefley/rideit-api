import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { CoastersController } from './coasters.controller';
import { CoasterService } from '../services/coaster.service';

new NestJSTestSuite(CoastersController)
    .addMocks(CoasterService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .run();
