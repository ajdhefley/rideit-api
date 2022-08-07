import { Module } from '@nestjs/common';
import { Configuration } from '../../infrastructure/configuration';
import { HttpService } from '../../services/http.service';

@Module({
    imports: [

    ],
    controllers: [

    ],
    providers: [
        Configuration,
        HttpService
    ]
})
export class UsersModule { }
