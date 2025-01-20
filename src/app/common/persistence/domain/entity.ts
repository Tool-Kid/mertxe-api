import { Class } from '@common/types';
import { Entity as TypesDDDEntity } from 'types-ddd';
import { Aggregate } from '@common/ddd';

export type DomainEntity<Props> = Class<Aggregate<Props>>;
