import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpService } from '../../services/http.service';
import { UsersModule } from '../users/users.module';
import { AccountController } from './controllers/account.controller';
import { OAuthController } from './controllers/oauth.controller';
import { AuthService } from './services/auth.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,

    UsersModule,

    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '60s' }
        }),
        inject: [ConfigService]
    })
  ],
  controllers: [
    AccountController,
    OAuthController
  ],
  providers: [
    HttpService,
    AuthService,
    //FacebookStrategy,
    GoogleStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
