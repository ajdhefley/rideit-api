import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { HttpService } from './http.service';

new NestJSTestSuite(HttpService)
    .addTest('should create', (controller) => {
        expect(controller).toBeTruthy();
    })
    .run();