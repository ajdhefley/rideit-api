import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GoogleGuard } from '../guards/google.guard';
import { FacebookGuard } from '../guards/facebook.guard';
import { OAuthProviders } from '../oauth-providers';
import AuthCookie from '../auth.cookie';
import { OAuthUser } from 'src/modules/users/models/oauth-user.model';
import { User } from 'src/modules/users/models/user.model';
import { HttpService } from '../../../services/http.service';

@Controller('oauth')
export class OAuthController {
    constructor(
        private readonly http: HttpService,
        private readonly authService: AuthService
    ) { }

    @Post('google')
    @UseGuards(GoogleGuard)
    async google(@Req() req, @Res() res) {}

    @Post('facebook')
    @UseGuards(FacebookGuard)
    async facebook(@Req() req, @Res() res) {}

    @Post('google/token')
    @UseGuards(GoogleGuard)
    async redirect(@Req() req, @Res() res) {
        let oauthUser = await this.http.get<OAuthUser>(`${process.env.SERVICE_USER_URI}/oauth-user/${OAuthProviders.Google}/${req.user.id}`);

        if (!oauthUser) {
            const userInsertResult = await this.http.post(`${process.env.SERVICE_USER_URI}/user`, {
                username: req.user.email
            });

            const oauthUserInsertResult = await this.http.post(`${process.env.SERVICE_USER_URI}/oauth-user`, {
                userId: userInsertResult.userId,
                oauthIdentifier: req.user.id,
                oauthServiceId: OAuthProviders.Google
            });

            oauthUser = oauthUserInsertResult;
        }

        const { password: Password, ...Passwordless } = await this.http.get<User>(`${process.env.SERVICE_USER_URI}/user/${oauthUser.userId}`);
        const token = await this.authService.generateJwt(Passwordless);

        res.header('Access-Control-Allow-Credentials', 'true');
        res.cookie(AuthCookie.name, token, AuthCookie.options);
        res.status(200);
        res.end();
    }
}