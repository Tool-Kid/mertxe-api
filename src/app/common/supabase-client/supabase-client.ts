import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  createClient,
  SupabaseClient as SupabaseClient$,
} from '@supabase/supabase-js';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseClientConfig } from './supabase-client-config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SupabaseClient {
  private clientsPoll = new Map<string, SupabaseClient$>([]);

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly config: SupabaseClientConfig,
    private readonly jwtService: JwtService
  ) {}

  async getClient() {
    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
    const decodedJwtToken = this.jwtService.decode(jwtToken);

    const clientKey =
      this.request.body.email || decodedJwtToken.credentials.email;
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

  private async loginWithUser(client: SupabaseClient$) {
    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
    const decodedJwtToken = this.jwtService.decode(jwtToken);

    const email = this.request.body.email ?? decodedJwtToken.credentials.email;
    const password =
      this.request.body.password ?? decodedJwtToken.credentials.password;

    await client.auth.signInWithPassword({
      email,
      password,
    });

    return client;
  }
}
