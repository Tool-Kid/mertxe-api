import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthUser } from '@supabase/supabase-js';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JWTStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(user: AuthUser) {
    return user;
  }
}
