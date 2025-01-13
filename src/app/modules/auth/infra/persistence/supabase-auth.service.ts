import { AuthService, Credentials } from '../../domain/auth.service';
import { Inject } from '@nestjs/common';
import { SupabaseClient } from 'src/app/modules/supabase-client';
import { AuthUser } from '../../domain/auth-user';

export class SupabaseAuthService implements AuthService {
  @Inject(SupabaseClient) private readonly supabaseClient: SupabaseClient;

  async register(credentials: Credentials): Promise<AuthUser> {
    const { data, error } = await this.supabaseClient.instance.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
    return {
      user: data.user,
    };
  }

  async login(credentials: Credentials): Promise<AuthUser> {
    const { data, error } =
      await this.supabaseClient.instance.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
    return {
      user: data.user,
    };
  }
}
