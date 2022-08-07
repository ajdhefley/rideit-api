import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Configuration } from 'src/infrastructure/configuration';
import AuthCookie from '../auth.cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: Configuration){
        super({
            ignoreExpiration: false,
            secretOrKey: config.jwt.secret,
            jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => {
                return request?.cookies[AuthCookie.name];
            }])
        });
    }
 
    async validate(payload: any) {
        if (!payload) {
            throw new UnauthorizedException();
        }
        
        return payload;
    }
}