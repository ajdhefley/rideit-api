import * as typeorm from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NestJSTestSuite } from '@ajdhefley/test-suite-nest';
import { UserService } from './user.service';
import { UserEntity } from '../models/user.entity';

var connection: typeorm.DataSource;

new NestJSTestSuite(UserService)
    .beforeEach(async () => {
        connection = await typeorm.createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [UserEntity],
            synchronize: true,
            logging: false
        });
    })
    .afterEach(async () => {
        connection?.close();
    })
    .addMocks(UserService)
    .addProviders({
        provide: getRepositoryToken(UserEntity),
        useClass: typeorm.Repository
    })
    .addTest('should create', (service) => {
        expect(service).toBeTruthy();
    })
    .run();
