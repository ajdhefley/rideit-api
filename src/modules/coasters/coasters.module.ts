import { Module } from '@nestjs/common';
import { CoasterImageResolver } from './resolvers/coaster-image.resolver';
import { CoasterResolver } from './resolvers/coaster.resolver';
import { UsersModule } from '../users/users.module';
import { HttpService } from 'src/services/http.service';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [

    ],
    providers: [
        HttpService,
        CoasterResolver,
        CoasterImageResolver
    ]
})
export class CoastersModule { }
