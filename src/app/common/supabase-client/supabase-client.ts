import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  createClient,
  SupabaseClient as SupabaseClient$,
} from '@supabase/supabase-js';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseClientConfig } from './supabase-client-config';
import { JwtService } from '@nestjs/jwt';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseClient {
  readonly instance: SupabaseClient$ = createClient(
    this.config.url,
    this.config.token,
    {}
  );
  private authenticated = false;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly config: SupabaseClientConfig,
    private readonly jwtService: JwtService
  ) {}

  async getClient() {
    if (this.authenticated) {
      return this.instance;
    }

    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
    const decodedJwtToken = this.jwtService.decode(jwtToken);
    console.log(decodedJwtToken);

    await this.instance.auth.signInWithPassword({
      email: decodedJwtToken.credentials.email,
      password: decodedJwtToken.credentials.password,
    });
    this.authenticated = true;

    return this.instance;
  }
}
