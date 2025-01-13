import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SupabaseClient } from '../../../common/supabase-client';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { RegisterDto, RegisterResponse } from './register.dto';
import { AuthService } from '../domain/auth.service';
import { Public } from '../infra/http';

@Controller('auth/register')
@ApiTags(OPEN_API_TAG.AUTH)
export class RegisterController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly authService: AuthService
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

    await this.supabaseClient.instance
      .from('UserProfile')
      .insert([{ user_id: user.id, scoring: 1000 }])
      .select();

    return {
      user: user,
    };
  }
}
