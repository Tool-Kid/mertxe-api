import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  createClient,
  SupabaseClient as SupabaseClient$,
} from '@supabase/supabase-js';
import { SupabaseClientConfig } from './supabase-client-config';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class SupabaseClient {
  private clientsPoll = new Map<string, SupabaseClient$>([]);

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly config: SupabaseClientConfig,
    private readonly jwtService: JwtService,
    private readonly cls: ClsService
  ) {}

  get email() {
    return this.cls.get('email') || this.token.credentials.email;
  }

  get password() {
    return this.cls.get('password') || this.token.credentials.password;
  }

  async getClient() {
    const clientKey = this.email;
    let client = this.clientsPoll.get(clientKey);

    if (!client) {
      client = createClient(this.config.url, this.config.token, {});
      client = await this.loginWithUser(client);
      this.clientsPoll.set(clientKey, client);
    }

    return client;
  }

  public getEmptyClient() {
    return createClient(this.config.url, this.config.token, {});
  }

  get token() {
    const jwtToken = (this.cls.get('jwt_token') as string)?.replace(
      'Bearer ',
      ''
    );
    const decodedJwtToken = this.jwtService.decode(jwtToken);
    return decodedJwtToken;
  }

  private async loginWithUser(client: SupabaseClient$) {
    await client.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    return client;
  }
}
