import { NestJSTestSuite } from '@ajdhefley/slim-suite-nest';
import { UserOutboundService } from '../../../services/outbound/user-outbound.service';
import { AuthService } from '../services/auth.service';
import { OAuthController } from './oauth.controller';

new NestJSTestSuite(OAuthController)
    .addMocks(UserOutboundService, AuthService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .run();
