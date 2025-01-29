import { Notification } from '../notification';
import { DistributionChannel } from '../../distribution-channel';

interface EmailNotificationData {
  to: string;
  subject: string;
  content: string;
  data: object;
}

export class EmailNotification extends Notification<EmailNotificationData> {
  readonly channel: DistributionChannel = DistributionChannel.EMAIL;

  constructor(data: EmailNotificationData) {
    super(data);
  }
}
