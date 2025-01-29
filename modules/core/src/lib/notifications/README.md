# NotificationsModule

## Usage

## Creating notifications

### Domain Notification
```ts

import { Notification, INotification } from '@mertxe/core';

interface FooNotificationData {
  email: string;
  username: string;
  message: string;
}

@Notification('FOO_NOTIFICATION')
export class FooNotification extends INotification<FooNotificationData> {
  constructor(data: FooNotificationData) {
    super({ data });
  }
}
```

### Infrastructure Notifications

#### Email Notification

```ts
export class EmailFooNotification extends IEmailNotification {
  constructor(notification: FooNotification) {
    super({
      to: notification.data.email,
      content: `
      <h1> Hello, {{username}}! </h1>
      <p> {{message}} </p>
      `
    });
  }
}
```

## Nest

### Global Setup
```ts

@Module({
  imports: [
    Notificationsmodule.forRoot({
      channels: [],
    }),
  ]
})
export class AppModule {}
```

### Module Setup

```ts

@Module({
  imports: [
    Notificationsmodule.forFeature({
      notifications: [
        {
          report: FooNotification,
          using: [EmailFooNotification, SlackFooNotification]
        }
      ],
    }),
  ]
})
export class FeatureModule {}
```

### Using `NotificationsService`

```ts

@Injectable()
export class SomeService {
  constructor(
    private readonly ns: NotificationsService
  ) {}
  
  sendNotification() {
    const notification = new FooNotification({
      email: 'foo@mail.com',
      username: 'Foo',
      message: 'Some text!'
    })
    this.ns.send();
  }
}
```