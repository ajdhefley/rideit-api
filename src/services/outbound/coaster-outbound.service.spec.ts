import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { HttpService } from '../http.service';
import { CoasterOutboundService } from './coaster-outbound.service';

new NestJSTestSuite(CoasterOutboundService)
    .addMocks(HttpService)
    .beforeEach(() => {
        process.env.SERVICE_COASTER_URI = 'test';
    })
    .addTest('should make http call to search coasters by query', (service, mocks) => {
        // Arrange
        // Act
        service.searchCoasters('test-query');

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/coasters/search/test-query');
    })
    .addTest('should make http call to get coasters', (service, mocks) => {
        // Arrange
        // Act
        service.getCoasters();

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/coasters');
    })
    .addTest('should make http call to get coaster by url', (service, mocks) => {
        // Arrange
        // Act
        service.getCoaster('test-url');

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/coaster/test-url');
    })
    .addTest('should make http call to get coaster images by url', (service, mocks) => {
        // Arrange
        // Act
        service.getCoasterImages('test-url');

        // Assert
        expect(mocks.get(HttpService).get).toHaveBeenCalledWith('test/coaster/test-url/images');
    })
    .run();
