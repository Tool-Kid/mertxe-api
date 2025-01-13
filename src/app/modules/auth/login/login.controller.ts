import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SupabaseClient } from '../../supabase-client';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { LoginDto, LoginResponse } from './login.dto';
import { AuthService } from '../domain/auth.service';

@Controller('auth/login')
@ApiTags(OPEN_API_TAG.AUTH)
export class LoginController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Post()
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    const { status, user } = await this.authService.login({
      email: dto.email,
      password: dto.password,
    });

    if (status === 'FAILED') {
      throw new BadRequestException('Wrong credentials');
    }

    const profile = await this.supabaseClient.instance
      .from('UserProfile')
      .select('*');

    return {
      user,
      profile: {
        scoring: profile.data[0].scoring,
      },
      accessToken: this.jwtService.sign({ user }),
    };
  }
}
