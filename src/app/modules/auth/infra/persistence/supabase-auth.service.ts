import { Injectable } from '@nestjs/common';
import {
  AuthService,
  Credentials,
  LoginResult,
  RegisterResult,
} from '@modules/auth/domain/auth.service';
import { SupabaseClient } from '@mertxe/core';

@Injectable()
export class SupabaseAuthService implements AuthService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async register(credentials: Credentials): Promise<RegisterResult> {
    const { data, error } = await this.supabaseClient
      .getEmptyClient()
      .auth.signUp({
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
    const { data, error } = await this.supabaseClient
      .getEmptyClient()
      .auth.signInWithPassword({
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
