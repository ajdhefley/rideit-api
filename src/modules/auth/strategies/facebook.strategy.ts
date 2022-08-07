import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import { Configuration } from 'src/infrastructure/configuration';

dotenv.config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(config: Configuration) {
        super({
            clientID: config.facebook.appId,
            clientSecret: config.facebook.secret,
            callbackURL: config.facebook.oauthRedirectUri,
            profileFields: ['id', 'first_name', 'last_name', 'picture', 'email']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        const { first_name, last_name, picture, email } = profile;
        const user = {
            accessToken,
            email,
            picture,
            firstName: first_name,
            lastName: last_name
        };
        done(null, user);
    }
}