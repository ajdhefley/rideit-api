import { Injectable } from '@nestjs/common';

@Injectable()
export class Configuration {
    public readonly isProduction = process.env.NODE_ENV === 'production';

    public readonly port = process.env.PORT || 4040;

    public readonly host = process.env.HOST || '0.0.0.0';

    public readonly services = {
        coaster: process.env.SERVICE_COASTER_URI,
        comment: process.env.SERVICE_COMMENT_URI,
        review: process.env.SERVICE_REVIEW_URI,
        user: process.env.SERVICE_USER_URI
    };

    public readonly database = {
        host: process.env.DATABASE_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    };

    public readonly jwt = {
        expirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
        secret: process.env.JWT_SECRET
    };

    public readonly google = {
        oauthRedirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        clientId: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_SECRET
    };

    public readonly facebook = {
        oauthRedirectUri: process.env.FACEBOOK_OAUTH_REDIRECT_URI,
        appId: process.env.FACEBOOK_APP_ID,
        secret: process.env.FACEBOOK_SECRET
    };
}