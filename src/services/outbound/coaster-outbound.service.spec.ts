import { NestJSTestSuite } from '@ajdhefley/slim-suite-nest';
import { Configuration } from '../../infrastructure/configuration';
import { HttpService } from '../http.service';
import { CoasterOutboundService } from './coaster-outbound.service';

new NestJSTestSuite(CoasterOutboundService)
    .addMocks(Configuration, HttpService)
    .beforeEach((service, mocks) => {
        // Cast to any first since the properties are readonly
        (mocks.get(Configuration) as any).services = { coaster: 'test' };
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
