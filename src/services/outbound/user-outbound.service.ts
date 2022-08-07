import { Injectable } from '@nestjs/common';
import { Configuration } from '../../infrastructure/configuration';
import { OAuthUser } from '../../modules/users/models/oauth-user.model';
import { User } from '../../modules/users/models/user.model';
import { HttpService } from '../http.service';

@Injectable()
export class UserOutboundService {
    constructor(
        private http: HttpService,
        private config: Configuration
    ) { }

    async getUser(userId: number): Promise<User> {
        return this.http.get(`${this.config.services.user}/user/${userId}`);
    }

    async getUserByUsername(username: string): Promise<User> {
        return this.http.get(`${this.config.services.user}/user/${username}`);
    }

    async getOAuthUser(serviceId: number, serviceAccountId: string): Promise<OAuthUser> {
        return this.http.get(`${this.config.services.user}/oauth-user/${serviceId}/${serviceAccountId}`);
    }

    async saveUser(user: any) {
        return this.http.post(`${this.config.services.user}/user`, user);
    }

    async saveOAuthUser(oauthUser: any) {
        return this.http.post(`${this.config.services.user}/oauth-user`, oauthUser);
    }
}