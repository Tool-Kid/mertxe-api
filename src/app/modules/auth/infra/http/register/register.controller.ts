import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SupabaseClient } from '../../../../../common/supabase-client';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { RegisterDto, RegisterResponse } from './register.dto';
import { AuthService } from '../../../domain/auth.service';
import { Public } from '..';
import { JwtService } from '@nestjs/jwt';
import { EventBus } from '@common/events/domain/event-bus';
import { EVENTS } from '@common/events/events';
import { UserRegisteredEvent } from '../../../domain/user-registered.event';

@Controller('auth/register')
@ApiTags(OPEN_API_TAG.AUTH)
export class RegisterController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus
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
      .insert({ user_id: user.id })
      .select('*');

    const result = await this.eventBus.emit(
      EVENTS.USER_REGISTERED,
      new UserRegisteredEvent({
        id: user.id,
        email: user.email,
        password: dto.password,
      })
    );

    await this.supabaseClient.instance
      .from('UserProfiles')
      .update({ scoring: result.amount })
      .eq('user_id', user.id);

    return {
      user: user,
      accessToken: this.jwtService.sign({ supabase: user, credentials: dto }),
      profile: {
        scoring: profile.data[0].scoring,
      },
    };
  }
}
