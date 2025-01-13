import { AuthUser } from '@supabase/supabase-js';

export interface Credentials {
  email: string;
  password: string;
}

export abstract class AuthService {
  abstract register(credentials: Credentials): Promise<AuthUser>;
  abstract login(credentials: Credentials): Promise<AuthUser>;
}
