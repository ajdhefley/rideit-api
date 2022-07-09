import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(){
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => {
                const cookie = request?.cookies['auth'];
                return cookie?.token;
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