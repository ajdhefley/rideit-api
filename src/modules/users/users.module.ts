import { Module } from '@nestjs/common';
import { HttpService } from '../../services/http.service';

@Module({
    imports: [

    ],
    controllers: [

    ],
    providers: [
        HttpService
    ]
})
export class UsersModule { }
