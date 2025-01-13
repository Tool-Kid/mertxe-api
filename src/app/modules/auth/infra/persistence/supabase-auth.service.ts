import { Injectable } from '@nestjs/common';
import {
  AuthService,
  Credentials,
  LoginResult,
  RegisterResult,
} from '../../domain/auth.service';
import { SupabaseClient } from '@common/supabase-client';

@Injectable()
export class SupabaseAuthService implements AuthService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

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
