import { Class } from 'modules/core/src/lib/types';
import { Aggregate } from 'modules/core/src/lib/ddd';

export type DomainEntity<Props> = Class<Aggregate<Props>>;
