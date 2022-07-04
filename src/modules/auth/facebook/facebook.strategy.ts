import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/auth/redirect/facebook`,
        profileFields: ['id', 'first_name', 'last_name', 'picture', 'email']
        });
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
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