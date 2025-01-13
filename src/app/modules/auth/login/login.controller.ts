import { Body, Controller, Post } from '@nestjs/common';
import { SupabaseClient } from '../../supabase-client';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { LoginDto, LoginResponse } from './login.dto';

@Controller('auth/login')
@ApiTags(OPEN_API_TAG.AUTH)
export class LoginController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly jwtService: JwtService
  ) {}

  @Post()
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    const { data, error } =
      await this.supabaseClient.instance.auth.signInWithPassword({
        email: dto.email,
        password: dto.password,
      });
    const profile = await this.supabaseClient.instance
      .from('UserProfile')
      .insert([{ user_id: data.user.id, scoring: 1000 }])
      .select();
    return {
      user: data ?? error,
      profile: {
        scoring: profile.data[0].scoring,
      },
      accessToken: this.jwtService.sign({ user: data ?? error }),
    };
  }
}
