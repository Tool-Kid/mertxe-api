export class LoginDto {
  email: string;
  password: string;
}

export class LoginResponse {
  user: any;
  accessToken: string;
  profile: {
    scoring: number;
  };
}
