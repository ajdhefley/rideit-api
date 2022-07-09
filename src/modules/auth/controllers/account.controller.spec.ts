import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { AccountController } from './account.controller';
import { AuthService } from '../services/auth.service';

new NestJSTestSuite(AccountController)
    .addMocks(AuthService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .addTest('should handle Google', (controller) => {
        controller.google();
    })
    .addTest('should handle Facebook', (controller) => {
        controller.facebook();
    })
    .run();
