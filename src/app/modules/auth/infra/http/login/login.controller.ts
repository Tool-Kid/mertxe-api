import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { LoginDto, LoginResponse } from './login.dto';
import { SupabaseClient } from '@common/supabase-client';
import { AuthService } from '../../../domain/auth.service';
import { Public } from '../public';

@Controller('auth/login')
@ApiTags(OPEN_API_TAG.AUTH)
export class LoginController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @Public()
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
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
