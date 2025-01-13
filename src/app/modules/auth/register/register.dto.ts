export class RegisterDto {
  email: string;
  password: string;
}

export class RegisterResponse {
  user?: any;
  error?: string;
}
