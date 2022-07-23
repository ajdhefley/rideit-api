import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import AuthCookie from '../auth.cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(){
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
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