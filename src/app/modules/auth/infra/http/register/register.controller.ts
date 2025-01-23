import { BadRequestException, Body } from '@nestjs/common';
import { SupabaseClient } from '@common/persistence/infra/supabase';
import { RegisterDto, RegisterResponse } from './register.dto';
import { AuthService } from '@modules/auth/domain/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegisteredEvent } from '@modules/auth/domain/user-registered.event';
import { EventBus } from '@common/events';
import { Controller, IController, HandleOperation } from '@common/http';
import { ApiGroup, AuthOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.AUTH,
  operation: AuthOperationName.REGISTER,
})
export class RegisterController implements IController {
  constructor(
    private readonly supabaseClient: SupabaseClient,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus
  ) {}

  @HandleOperation()
  async handle(@Body() dto: RegisterDto): Promise<RegisterResponse> {
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

    const client = await this.supabaseClient.getClient();

    const profile = await client
      .from('UserProfiles')
      .insert({ user_id: user.id })
      .select('*');

    const result = await this.eventBus.publish(
      new UserRegisteredEvent({ userId: user.id })
    );

    await client
      .from('UserProfiles')
      .update({ scoring: result.data.amount })
      .eq('user_id', user.id);

    return {
      user: user,
      accessToken: this.jwtService.sign({ supabase: user, credentials: dto }),
      profile: {
        scoring: result.data.amount,
      },
    };
  }
}
