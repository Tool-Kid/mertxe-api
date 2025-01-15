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

    await this.loginWithUser();

    this.authenticated = true;

    return this.instance;
  }

  private isOutOfRequestContext() {
    return !this.request.body;
  }

  private async loginWithUser() {
    let email;
    let password;
    if (this.isOutOfRequestContext()) {
      const request = this.request as any;
      email = request.props.email;
      password = request.props.password;
    } else {
      const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
      const decodedJwtToken = this.jwtService.decode(jwtToken);
      email = decodedJwtToken.credentials.email;
      password = decodedJwtToken.credentials.password;
    }

    await this.instance.auth.signInWithPassword({
      email,
      password,
    });
  }
}
