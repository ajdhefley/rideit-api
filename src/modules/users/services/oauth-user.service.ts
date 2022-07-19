import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OAuthUserEntity } from '../models/oauth-user.entity';

@Injectable()
export class OAuthUserService {
    constructor(
        @InjectRepository(OAuthUserEntity)
        private oauthUserRepository: Repository<OAuthUserEntity>
    ) { }

    findOne(oauthServiceId: number, oauthIdentifier: string) {
        return this.oauthUserRepository.findOne({
            where: { oauthServiceId, oauthIdentifier }
        });
    }

    insert(oauthUser: OAuthUserEntity) {
        return this.oauthUserRepository.insert(oauthUser);
    }
}