import {
  NodemailerNotificationsPublisher,
  NotificationsPublisher,
  PublisherOptions,
} from '@mertxe/core';

export class NotificationsPublisherFactory {
  static build(options: PublisherOptions): NotificationsPublisher {
    switch (options.type) {
      case 'NODEMAILER':
        return new NodemailerNotificationsPublisher(options);
      default:
        throw new Error(`No Publisher for type ${options.type}`);
    }
  }
}
