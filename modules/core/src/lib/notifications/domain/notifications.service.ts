import { Notification } from './notification';
import { NotificationsGlobalRegistry } from './notification';
import { NotificationsPublisherRegistry } from './publisher';

export class NotificationsService {
  constructor(
    private readonly publishersRegistry: NotificationsPublisherRegistry,
    private readonly notificationsRegistry: NotificationsGlobalRegistry
  ) {}

  async send(notification: Notification<any>): Promise<void> {
    const notifications = this.notificationsRegistry.getNotificationsForKey(
      notification.name
    );
    for (const notificationClass of notifications) {
      const notificationInstance = new notificationClass(notification);
      const publishers = this.publishersRegistry.getPublishersForChannel(
        notificationInstance.channel
      );
      for (const publisher of publishers) {
        await publisher.send(notificationInstance);
      }
    }
  }
}
