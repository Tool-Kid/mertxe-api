import { NotificationsRegistry } from './notifications-registry';
import { Class, DistributableNotification, Notification } from '@mertxe/core';

export class NotificationsGlobalRegistry {
  readonly registries: NotificationsRegistry[] = [];

  addRegistry(registry: NotificationsRegistry) {
    this.registries.push(registry);
  }

  getNotificationsForKey(key: string): Class<DistributableNotification>[] {
    const notifications = this.registries
      .map((registry) => registry.getNotificationsForKey(key))
      .flat();
    return notifications;
  }
}
