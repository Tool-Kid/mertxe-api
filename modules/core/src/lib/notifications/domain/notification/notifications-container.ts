import { Class, DistributableNotification } from '@mertxe/core';

export class NotificationsContainer {
  private readonly notificationsMap = new Map<
    string,
    Class<DistributableNotification>[]
  >([]);

  public addNotification(
    name: string,
    notifications: Class<DistributableNotification>[]
  ) {
    const notificationsRegistered = this.notificationsMap.get(name);
    if (!notificationsRegistered) {
      this.notificationsMap.set(name, notifications);
    } else {
      this.notificationsMap.set(name, [
        ...notificationsRegistered,
        ...notifications,
      ]);
    }
  }

  public getNotificationsForKey(
    key: string
  ): Class<DistributableNotification>[] {
    const notifications = this.notificationsMap.get(key);
    if (!notifications || !notifications.length) {
      throw new Error(`No notifications registered for key ${key}`);
    }
    return notifications;
  }
}
