import { Class } from '@common/types';
import { Entity as TypesDDDEntity, Aggregate } from 'types-ddd';

export type DomainEntity<Props> =
  | Class<TypesDDDEntity<Props>>
  | Class<Aggregate<Props>>;
