import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { RedirectController } from './redirect.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [],
  controllers: [
    LoginController,
    RedirectController
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
