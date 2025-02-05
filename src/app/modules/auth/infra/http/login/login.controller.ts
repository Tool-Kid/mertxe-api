import { BadRequestException, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponse } from './login.dto';
import { SupabaseClient } from '@mertxe/core';
import { AuthService } from '@modules/auth/domain/auth.service';
import { Controller, IController, HandleOperation } from '@mertxe/core';
import { ApiGroup, AuthOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.AUTH,
  operation: AuthOperationName.LOGIN,
})
export class LoginController implements IController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @HandleOperation()
  async handle(@Body() dto: LoginDto): Promise<LoginResponse> {
    const { status, user } = await this.authService.login({
      email: dto.email,
      password: dto.password,
    });

    if (status === 'FAILED') {
      throw new BadRequestException('Wrong credentials');
    }

    const client = await this.supabaseClient.getClient();
    const profile = await client.from('UserProfiles').select('*');

    return {
      user,
      profile: {
        scoring: profile.data[0].scoring,
      },
      accessToken: this.jwtService.sign({ supabase: user, credentials: dto }),
    };
  }
}
