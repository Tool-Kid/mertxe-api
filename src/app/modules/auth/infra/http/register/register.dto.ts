export class RegisterDto {
  email: string;
  password: string;
}

export class RegisterResponse {
  user: any;
  accessToken: string;
  profile: {
    scoring: number;
  };
}
