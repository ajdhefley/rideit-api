import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoastersController } from './controllers/coasters.controller';
import { CoasterImageEntity } from './models/coaster-image.entity';
import { CoasterEntity } from './models/coaster.entity';
import { CoasterImageResolver } from './resolvers/coaster-image.resolver';
import { CoasterResolver } from './resolvers/coaster.resolver';
import { CoasterImageService } from './services/coaster-image.service';
import { CoasterService } from './services/coaster.service';

@Module({
    imports: [
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
