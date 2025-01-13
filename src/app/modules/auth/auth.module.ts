import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { AuthService } from './domain/auth.service';
import { SupabaseAuthService } from './infra/persistence/supabase-auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '90d' },
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [{ provide: AuthService, useClass: SupabaseAuthService }],
})
export class AuthModule {}
