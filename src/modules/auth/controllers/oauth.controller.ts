import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GoogleGuard } from '../guards/google.guard';
import { FacebookGuard } from '../guards/facebook.guard';
import { OAuthUserService } from '../../users/services/oauth-user.service';
import { UserService } from '../../users/services/user.service';
import { UserEntity } from '../../users/models/user.entity';
import { OAuthUserEntity } from '../../users/models/oauth-user.entity';
import { OAuthProviders } from '../oauth-providers';
import AuthCookie from '../auth.cookie';

@Controller('oauth')
export class OAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly oauthUserService: OAuthUserService
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
        let oauthUser = await this.oauthUserService.findOne(OAuthProviders.Google, req.user.id);

        if (!oauthUser) {
            const userInsertResult = await this.userService.insert(<UserEntity>{
                username: req.user.email,  
            });
            
            const oauthUserInsertResult = await this.oauthUserService.insert(<OAuthUserEntity> {
                oauthServiceId: OAuthProviders.Google,
                userId: userInsertResult.raw[0].userid,
                oauthIdentifier: req.user.id
            });

            oauthUser = oauthUserInsertResult.raw[0];
        }

        const token = await this.authService.generateJwt(oauthUser.userId);

        res.header('Access-Control-Allow-Credentials', 'true');
        res.cookie(AuthCookie.name, token, AuthCookie.options);
        res.status(200);
        res.end();
    }
}