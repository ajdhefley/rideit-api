import * as typeorm from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { CoasterService } from '../services/coaster.service';
import { CoasterEntity } from '../models/coaster.entity';

var connection: typeorm.DataSource;

new NestJSTestSuite(CoasterService)
    .beforeEach(async () => {
        connection = await typeorm.createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [CoasterEntity],
            synchronize: true,
            logging: false
        });
    })
    .afterEach(async () => {
        connection?.close();
    })
    .addMocks(CoasterService)
    .addProviders({
        provide: getRepositoryToken(CoasterEntity),
        useClass: typeorm.Repository
    })
    .addTest('should create', (service) => {
        expect(service).toBeTruthy();
    })
    .run();
