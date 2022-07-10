import * as typeorm from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { ReviewTagService } from './review-tag.service';
import { ReviewEntity } from '../models/review.entity';

var connection: typeorm.DataSource;

new NestJSTestSuite(ReviewTagService)
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
    .addMocks(ReviewTagService)
    .addProviders({
        provide: getRepositoryToken(ReviewEntity),
        useClass: typeorm.Repository
    })
    .addTest('should create', (service) => {
        expect(service).toBeTruthy();
    })
    .run();
