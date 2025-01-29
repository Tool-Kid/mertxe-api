import { NotificationsPublisher } from '@mertxe/core';
import { DistributionChannel } from '../distribution-channel';

export class NotificationsPublisherRegistry {
  readonly publishers: NotificationsPublisher[] = [];

  public addPublisher(publisher: NotificationsPublisher) {
    this.publishers.push(publisher);
  }

  public getPublishersForChannel(channel: DistributionChannel) {
    const publishers = this.publishers.filter(
      (publisher) => publisher.channel === channel
    );
    return publishers;
  }
}
