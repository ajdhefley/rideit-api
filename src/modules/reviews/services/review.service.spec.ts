import * as typeorm from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { ReviewService } from './review.service';
import { ReviewEntity } from '../models/review.entity';

var connection: typeorm.DataSource;

new NestJSTestSuite(ReviewService)
    .beforeEach(async () => {
        connection = await typeorm.createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [ReviewEntity],
            synchronize: true,
            logging: false
        });
    })
    .afterEach(async () => {
        connection?.close();
    })
    .addMocks(ReviewService)
    .addProviders({
        provide: getRepositoryToken(ReviewEntity),
        useClass: typeorm.Repository
    })
    .addTest('should create', (service) => {
        expect(service).toBeTruthy();
    })
    .run();
