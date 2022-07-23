import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { HttpService } from '../../../services/http.service';
import { AuthService } from '../services/auth.service';
import { OAuthController } from './oauth.controller';

new NestJSTestSuite(OAuthController)
    .addMocks(HttpService, AuthService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .run();
