import { NestJSTestSuite } from '@ajdhefley/slim-suite-nest';
import { AccountController } from './account.controller';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';

new NestJSTestSuite(AccountController)
    .addMocks(JwtService, AuthService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .run();
