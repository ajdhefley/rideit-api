import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { AuthService } from '../services/auth.service';
import { OAuthController } from './oauth.controller';

new NestJSTestSuite(OAuthController)
    .addMocks(AuthService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .addTest('should handle Google', (controller) => {
        const user = {};
        const result = controller.google({ user }) as any;

        expect(result.message).toBe('User information from Google');
        expect(result.user).toBe(user);
    })
    .addTest('should handle Facebook', (controller) => {
        const user = {};
        const result = controller.facebook({ user }) as any;

        expect(result.message).toBe('User information from Facebook');
        expect(result.user).toBe(user);
    })
    .run();
