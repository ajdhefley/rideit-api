import { Controller, Body, Req, Res, Post, Get, UseGuards, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtGuard } from '../guards/jwt.guard';
import { AuthService } from '../services/auth.service';
import AuthCookie from '../auth.cookie';
import { JwtService } from '@nestjs/jwt';

@Controller('auth/account')
export class AccountController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) { }

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response, @Body() body) {
        const user = await this.authService.loginUser(body.username, body.password);

        if (!user) {
            return res.status(403).end();
        }

        res.header('Access-Control-Allow-Credentials', 'true');
        res.cookie(AuthCookie.name, user.access_token, AuthCookie.options);
        res.status(200)
        res.send(user);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        res.clearCookie(AuthCookie.name, { path: '/' });
        res.end();
    }

    @Post('token-validation/:token')
    async validate(@Param('token') token, @Res() res: Response) {
        try {
            await this.jwtService.verify(token);
            res.status(200).end();
        }
        catch (err) {
            res.status(401).end();
        }
    }
}