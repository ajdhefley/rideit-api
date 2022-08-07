import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Configuration } from 'src/infrastructure/configuration';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(config: Configuration) {
        super({
            clientID: config.google.clientId,
            clientSecret: config.google.secret,
            callbackURL: config.google.oauthRedirectUri,
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const { id, name, emails, photos } = profile;
        const user = {
            id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        };
        return user;
    }
}