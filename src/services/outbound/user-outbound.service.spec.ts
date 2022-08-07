import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { HttpService } from '../http.service';
import { UserOutboundService } from './user-outbound.service';

new NestJSTestSuite(UserOutboundService)
    .addMocks(HttpService)
    .beforeEach(() => {
        process.env.SERVICE_USER_URI = 'test';
    })
    
    .addTest('should make http call to get user', (service, mocks) => {
        // Arrange
        // Act
        service.getUser(1);

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/user/1');
    })
    .addTest('should make http call to get oauth user', (service, mocks) => {
        // Arrange
        // Act
        service.getOAuthUser(6, 3);

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/oauth-user/6/3');
    })
    .addTest('should make http call to post user', (service, mocks) => {
        // Arrange
        const user = { userId: 2 };

        // Act
        service.saveUser(user);

        // Assert
        expect(mocks.get(HttpService).post).toHaveBeenCalledWith('test/user', user);
    })    })
    .addTest('should make http call to post oauth user', (service, mocks) => {
        // Arrange
        const oauthUser = { oauthUserId: 3 };

        // Act
        service.saveOAuthUser(oauthUser);

        // Assert
        expect(mocks.get(HttpService).post).toHaveBeenCalledWith('test/oauth-user', oauthUser);
    })
    .run();