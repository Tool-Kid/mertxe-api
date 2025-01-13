import { AuthUser } from '@supabase/supabase-js';

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResult {
  user?: AuthUser;
  status: 'FAILED' | 'SUCCESS';
}

export interface RegisterResult {
  user?: AuthUser;
  status: 'FAILED' | 'SUCCESS';
}

export abstract class AuthService {
  abstract register(credentials: Credentials): Promise<RegisterResult>;
  abstract login(credentials: Credentials): Promise<LoginResult>;
}
