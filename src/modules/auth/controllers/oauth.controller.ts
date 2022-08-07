import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GoogleGuard } from '../guards/google.guard';
import { FacebookGuard } from '../guards/facebook.guard';
import { OAuthProviders } from '../oauth-providers';
import AuthCookie from '../auth.cookie';
import { OAuthUser } from '../../../modules/users/models/oauth-user.model';
import { User } from '../../../modules/users/models/user.model';
import { UserOutboundService } from '../../../services/outbound/user-outbound.service';

@Controller('oauth')
export class OAuthController {
    constructor(
        private readonly userService: UserOutboundService,
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
        let oauthUser = await this.userService.getOAuthUser(OAuthProviders.Google, req.user.id);

        if (!oauthUser) {
            const userInsertResult = await this.userService.saveUser({
                username: req.user.email
            });

            const oauthUserInsertResult = await this.userService.saveOAuthUser({
                userId: userInsertResult.userId,
                oauthIdentifier: req.user.id,
                oauthServiceId: OAuthProviders.Google
            });

            oauthUser = oauthUserInsertResult;
        }

        const { password: Password, ...Passwordless } = await this.userService.getUser(oauthUser.userId);
        const token = await this.authService.generateJwt(Passwordless);

        res.header('Access-Control-Allow-Credentials', 'true');
        res.cookie(AuthCookie.name, token, AuthCookie.options);
        res.status(200);
        res.end();
    }
}