import * as typeorm from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { CommentService } from './comment.service';
import { CommentEntity } from '../models/comment.entity';

var connection: typeorm.DataSource;

new NestJSTestSuite(CommentService)
    .beforeEach(async () => {
        connection = await typeorm.createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [CommentEntity],
            synchronize: true,
            logging: false
        });
    })
    .afterEach(async () => {
        connection?.close();
    })
    .addMocks(CommentService)
    .addProviders({
        provide: getRepositoryToken(CommentEntity),
        useClass: typeorm.Repository
    })
    .addTest('should create', (service) => {
        expect(service).toBeTruthy();
    })
    .run();
