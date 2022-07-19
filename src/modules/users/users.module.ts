import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthUserEntity } from './models/oauth-user.entity';
import { UserEntity } from './models/user.entity';
import { OAuthUserService } from './services/oauth-user.service';
import { UserResolver } from './services/user.resolver';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, OAuthUserEntity])
    ],
    exports: [
        OAuthUserService,
        UserService
    ],
    controllers: [

    ],
    providers: [
        OAuthUserService,
        UserService,
        UserResolver
    ]
})
export class UsersModule { }
