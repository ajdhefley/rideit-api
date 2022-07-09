import * as moment from 'moment';
import { Controller, Body, Req, Res, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

@Controller('auth/account')
export class AccountController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response, @Body() body) {
        const user = await this.authService.loginUser(body.username, body.password);

        res.cookie('auth', { token: user.access_token }, {
            expires: moment().add(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES, 'minutes').toDate(),
            sameSite: 'strict',
            httpOnly: true
        });

        res.status(200);
        res.send(user);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        res.clearCookie('auth');
        res.end();
    }
}