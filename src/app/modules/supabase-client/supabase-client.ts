import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  createClient,
  SupabaseClient as SupabaseClient$,
} from '@supabase/supabase-js';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseClientConfig } from './supabase-client-config';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseClient {
  private readonly logger = new Logger(SupabaseClient.name);
  readonly instance: SupabaseClient$ = createClient(
    this.config.url,
    this.config.token,
    {}
  );

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly config: SupabaseClientConfig
  ) {}

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.instance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.instance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    this.instance.auth.signInWithIdToken(
      ExtractJwt.fromAuthHeaderAsBearerToken()(this.request)
    );
    this.logger.log('auth has been set!');

    return this.instance;
  }
}
