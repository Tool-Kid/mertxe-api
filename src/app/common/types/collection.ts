import { Aggregate } from '@common/ddd';

export interface Collection<Entity extends Aggregate<any>> {
  entries: Entity[];
}
