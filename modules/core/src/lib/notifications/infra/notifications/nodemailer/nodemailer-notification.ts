import { SendMailOptions } from 'nodemailer';
import { TemplateEngine } from '../../../../template-engine/domain/template-engine';

interface NodemailerNotificationProps {
  from: string;
  to: string;
  subject: string;
  body: {
    text: string;
    data: object;
  };
}

export class NodemailerNotification {
  readonly props: NodemailerNotificationProps;
  private readonly te = new TemplateEngine();

  constructor(props: NodemailerNotificationProps) {
    this.props = props;
  }

  get value(): SendMailOptions {
    return {
      ...this.props,
      html: this.te.render(this.props.body.text, this.props.body.data),
    };
  }
}
