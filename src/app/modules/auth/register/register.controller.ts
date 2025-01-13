import { Body, Controller, Post } from '@nestjs/common';
import { SupabaseClient } from '../../supabase-client';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { RegisterDto, RegisterResponse } from './register.dto';

@Controller('auth/register')
@ApiTags(OPEN_API_TAG.AUTH)
export class RegisterController {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  @Post()
  async register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
    const { data, error } = await this.supabaseClient.instance.auth.signUp({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      return {
        error: error.message,
      };
    }

    await this.supabaseClient.instance.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    await this.supabaseClient.instance
      .from('UserProfile')
      .insert([{ user_id: data.user.id, scoring: 1000 }])
      .select();

    return {
      user: data.user,
    };
  }
}
