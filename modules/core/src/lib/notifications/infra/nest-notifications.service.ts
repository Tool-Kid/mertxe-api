import {
  NotificationsPublisher,
  Notification,
  DistributableNotification,
} from '../domain';
import { Injectable } from '@nestjs/common';
import { DistributionChannel } from '../domain/distribution-channel';

@Injectable()
export class NestNotificationsService {
  readonly publishers: NotificationsPublisher[] = [];

  constructor(publishers: NotificationsPublisher[]) {
    this.publishers = publishers;
  }

  async send(notification: Notification<any>): Promise<void> {
    const notify = notification as DistributableNotification;
    const publisher = this.getPublisherByDistributionChannel(notify.channel);
    await publisher.send(notification);
  }

  private getPublisherByDistributionChannel(
    distributionChannel: DistributionChannel
  ): NotificationsPublisher {
    const publisher = this.publishers.find(
      (publisher) => publisher.channel === distributionChannel
    );
    if (!publisher) {
      throw new Error(`Unknown distribution channel: ${distributionChannel}`);
    }
    return publisher;
  }
}
