import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SupabaseClient } from '../../../common/supabase-client';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { RegisterDto, RegisterResponse } from './register.dto';
import { AuthService } from '../domain/auth.service';
import { Public } from '../infra/http';
import { JwtService } from '@nestjs/jwt';

@Controller('auth/register')
@ApiTags(OPEN_API_TAG.AUTH)
export class RegisterController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post()
  @Public()
  async register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
    const { user, status } = await this.authService.register({
      email: dto.email,
      password: dto.password,
    });

    if (status === 'FAILED') {
      throw new BadRequestException(
        'User already registered or not valid email'
      );
    }

    await this.authService.login({
      email: dto.email,
      password: dto.password,
    });

    const profile = await this.supabaseClient.instance
      .from('UserProfiles')
      .insert([{ user_id: user.id, scoring: 1000 }])
      .select();

    return {
      user: user,
      accessToken: this.jwtService.sign({ supabase: user, credentials: dto }),
      profile: {
        scoring: profile.data[0].scoring,
      },
    };
  }
}
