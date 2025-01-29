import { Notification } from '@mertxe/core';
import { DistributionChannel } from '../../../../../../modules/core/src/lib/notifications/domain/distribution-channel';

interface TimeClockSessionReportNotificationData {
  username: string;
  clockInAt: string;
  clockOutAt: string;
  duration: number;
  points: number;
  email: string;
}

export class TimeClockSessionReportNotification extends Notification<TimeClockSessionReportNotificationData> {
  constructor(data: TimeClockSessionReportNotificationData) {
    super(data);
  }

  readonly channel: DistributionChannel;
}
