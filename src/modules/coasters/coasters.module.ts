import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoastersController } from './controllers/coasters.controller';
import { CoasterImageEntity } from './models/coaster-image.entity';
import { CoasterEntity } from './models/coaster.entity';
import { CoasterImageResolver } from './services/coaster-image.resolver';
import { CoasterResolver } from './services/coaster.resolver';
import { CoasterImageService } from './services/coaster-image.service';
import { CoasterService } from './services/coaster.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule,
        
        TypeOrmModule.forFeature([CoasterEntity, CoasterImageEntity])
    ],
    controllers: [
        CoastersController
    ],
    providers: [
        CoasterService,
        CoasterImageService,
        CoasterResolver,
        CoasterImageResolver
    ]
})
export class CoastersModule { }
