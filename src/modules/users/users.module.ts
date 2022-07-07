import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserResolver } from './services/user.resolver';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    exports: [
        UserService
    ],
    controllers: [

    ],
    providers: [
        UserService,
        UserResolver
    ]
})
export class UsersModule { }
