import { SendMailOptions } from 'nodemailer';

interface NodemailerNotificationProps {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export class NodemailerNotification {
  readonly props: NodemailerNotificationProps;
  constructor(props: NodemailerNotificationProps) {
    this.props = props;
  }

  get value(): SendMailOptions {
    return this.props;
  }
}
