import {
  AuthService,
  Credentials,
  LoginResult,
  RegisterResult,
} from '../../domain/auth.service';
import { Inject } from '@nestjs/common';
import { SupabaseClient } from 'src/app/modules/supabase-client';
import { AuthUser } from '../../domain/auth-user';

export class SupabaseAuthService implements AuthService {
  @Inject(SupabaseClient) private readonly supabaseClient: SupabaseClient;

  async register(credentials: Credentials): Promise<RegisterResult> {
    const { data, error } = await this.supabaseClient.instance.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      return {
        status: 'FAILED',
      };
    }
    return {
      user: data.user,
      status: 'SUCCESS',
    };
  }

  async login(credentials: Credentials): Promise<LoginResult> {
    const { data, error } =
      await this.supabaseClient.instance.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
    if (error) {
      return {
        status: 'FAILED',
      };
    }
    return {
      user: data.user,
      status: 'SUCCESS',
    };
  }
}
