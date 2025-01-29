import { NotificationsContainer } from './notifications-container';
import { Class, DistributableNotification } from '@mertxe/core';

export class NotificationsRegistry {
  readonly containers: NotificationsContainer[] = [];

  addContainer(container: NotificationsContainer) {
    this.containers.push(container);
  }

  getNotificationsForKey(key: string): Class<DistributableNotification>[] {
    const notifications = this.containers
      .map((registry) => registry.getNotificationsForKey(key))
      .flat();
    return notifications;
  }
}
