import { NestJSTestSuite } from '@ajdhefley/slim-suite-nest';
import { HttpService } from './http.service';

new NestJSTestSuite(HttpService)
    .addTest('should create', (service) => {
        expect(service).toBeTruthy();
    })
    .run();