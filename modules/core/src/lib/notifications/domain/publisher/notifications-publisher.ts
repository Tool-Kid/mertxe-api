import { Notification } from '../notification';
import { DistributionChannel } from '../distribution-channel';

export abstract class NotificationsPublisher {
  readonly channel: DistributionChannel;

  constructor(type: DistributionChannel) {
    this.channel = type;
  }
  abstract send(notification: Notification<any>): Promise<void>;
}
