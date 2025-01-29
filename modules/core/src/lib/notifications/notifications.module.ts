import { DynamicModule, Module } from '@nestjs/common';
import {
  Notification,
  NotificationsPublisher,
  NotificationsService,
  NotificationsRegistry,
  NotificationsGlobalRegistry,
  NotificationsPublisherRegistry,
  NotificationsPublisherFactory,
  DistributableNotification,
} from './domain';
import {
  NodemailerNotificationsPublisher,
  NodemailerPublisherOptions,
} from './infra';
import { Class } from '../types';

export type PublisherOptions = NodemailerPublisherOptions;

interface NotificationsModuleForRootOptions {
  publishers: PublisherOptions[];
}

interface NotificationsModuleForFeatureOptions {
  notifications: {
    report: Class<Notification<any>>;
    using: Class<DistributableNotification>[];
  }[];
}

@Module({})
export class NotificationsModule {
  static forRoot(options: NotificationsModuleForRootOptions): DynamicModule {
    const PUBLISHERS_REGISTRY = new NotificationsPublisherRegistry();
    for (const publisherOptions of options.publishers) {
      const publisher = NotificationsPublisherFactory.build(publisherOptions);
      PUBLISHERS_REGISTRY.addPublisher(publisher);
    }
    return {
      module: NotificationsModule,
      global: true,
      providers: [
        {
          provide: NotificationsGlobalRegistry,
          useValue: new NotificationsGlobalRegistry(),
        },
        {
          provide: NotificationsPublisherRegistry,
          useValue: PUBLISHERS_REGISTRY,
        },
        {
          provide: NotificationsPublisher,
          useValue: NodemailerNotificationsPublisher,
        },
        {
          provide: NotificationsService,
          useFactory: (
            publishersRegistry: NotificationsPublisherRegistry,
            notificationsRegistry: NotificationsGlobalRegistry
          ) => {
            return new NotificationsService(
              publishersRegistry,
              notificationsRegistry
            );
          },
          inject: [NotificationsPublisherRegistry, NotificationsGlobalRegistry],
        },
      ],
      exports: [NotificationsService, NotificationsGlobalRegistry],
    };
  }

  static forFeature(
    options: NotificationsModuleForFeatureOptions
  ): DynamicModule {
    return {
      module: NotificationsModule,
      providers: [
        {
          provide: NotificationsRegistry,
          useFactory: (globalRegistry: NotificationsGlobalRegistry) => {
            const registry = new NotificationsRegistry();
            for (const notification of options.notifications) {
              registry.addNotification(
                notification.report.name,
                notification.using
              );
            }
            globalRegistry.addRegistry(registry);
            return registry;
          },
          inject: [NotificationsGlobalRegistry],
        },
      ],
    };
  }
}
