import * as typeorm from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { CoasterImageService } from './coaster-image.service';
import { CoasterImageEntity } from '../models/coaster-image.entity';

var connection: typeorm.DataSource;

new NestJSTestSuite(CoasterImageService)
    .beforeEach(async () => {
        connection = await typeorm.createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [CoasterImageEntity],
            synchronize: true,
            logging: false
        });
    })
    .afterEach(async () => {
        connection?.close();
    })
    .addMocks(CoasterImageService)
    .addProviders({
        provide: getRepositoryToken(CoasterImageEntity),
        useClass: typeorm.Repository
    })
    .addTest('should create', (service) => {
        expect(service).toBeTruthy();
    })
    .run();
