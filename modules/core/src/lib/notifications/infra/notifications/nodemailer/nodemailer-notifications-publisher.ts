import { Notification, NotificationsPublisher } from '../../../domain';
import { createTransport, Transporter } from 'nodemailer';
import { TransporterOptions } from './transporter-options';
import { NodemailerNotification } from './nodemailer-notification';
import { DistributionChannel } from '../../../domain/distribution-channel';

export type NodemailerPublisherOptions = TransporterOptions;

export class NodemailerNotificationsPublisher
  implements NotificationsPublisher
{
  private readonly transporter: Transporter;
  private readonly options: TransporterOptions;
  readonly channel: DistributionChannel = DistributionChannel.EMAIL;

  constructor(options: TransporterOptions) {
    this.options = options;
    this.transporter = createTransport({
      service: options.service,
      host: options.host,
      port: options.port,
      secure: false,
      auth: {
        user: options.auth.email,
        pass: options.auth.password,
      },
    });
  }

  async send(notification: Notification<any>): Promise<void> {
    const mail = new NodemailerNotification({
      from: this.options.auth.email,
      to: notification.data.to,
      subject: notification.data.subject,
      html: notification.data.content,
    });
    await this.transporter.sendMail(mail.value);
  }
}
