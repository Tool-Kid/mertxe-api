import { Class } from '@common/types';
import { Aggregate } from '@common/ddd';

export type DomainEntity<Props> = Class<Aggregate<Props>>;
