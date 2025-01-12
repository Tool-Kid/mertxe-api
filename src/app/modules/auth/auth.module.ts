import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'THIS_IS_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController, RegisterController],
})
export class AuthModule {}
