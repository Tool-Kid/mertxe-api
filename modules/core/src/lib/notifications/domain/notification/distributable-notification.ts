import { Notification } from './notification';
import { DistributionChannel } from '../distribution-channel';

export class DistributableNotification extends Notification<any> {
  readonly channel!: DistributionChannel;
  constructor(props: any) {
    super(props);
  }
}
