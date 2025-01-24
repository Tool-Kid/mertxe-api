import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RegisterController } from './infra/http/register/register.controller';
import { LoginController } from './infra/http/login/login.controller';
import { AuthService } from './domain/auth.service';
import { SupabaseAuthService } from './infra/persistence/supabase-auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { JWTStrategy } from './infra/passport';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '90d' },
    }),
    CqrsModule,
  ],
  controllers: [LoginController, RegisterController],
  providers: [
    { provide: AuthService, useClass: SupabaseAuthService },
    JWTStrategy,
  ],
  exports: [AuthService],
})
@Global()
export class AuthModule {}
