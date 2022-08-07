import { Injectable } from '@nestjs/common';
import { OAuthUser } from '../../modules/users/models/oauth-user.model';
import { User } from '../../modules/users/models/user.model';
import { HttpService } from '../http.service';

@Injectable()
export class UserOutboundService {
    private readonly Host = process.env.SERVICE_USER_URI;

    constructor(private http: HttpService) {}

    async getUser(userId: number): Promise<User> {
        return this.http.get(`${this.Host}/user/${userId}`);
    }

    async getOAuthUser(serviceId: number, serviceAccountId: string): Promise<OAuthUser> {
        return this.http.get(`${this.Host}/oauth-user/${serviceId}/${serviceAccountId}`);
    }

    async saveUser(user: any) {
        return this.http.post(`${this.Host}/user`, user);
    }

    async saveOAuthUser(oauthUser: any) {
        return this.http.post(`${this.Host}/oauth-user`, oauthUser);
    }
}