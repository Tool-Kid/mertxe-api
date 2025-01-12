import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthUser } from '@supabase/supabase-js';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(SupabaseStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: '',
    });
  }

  async validate(user: AuthUser) {
    return user;
  }
}
