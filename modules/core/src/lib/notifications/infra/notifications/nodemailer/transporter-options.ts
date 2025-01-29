export interface TransporterOptions {
  type: 'NODEMAILER';
  service: string;
  host: string;
  port: number;
  auth: {
    email: string;
    password: string;
  };
}
