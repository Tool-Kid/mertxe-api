import { Aggregate } from 'modules/core/src/lib/ddd';

export interface Collection<Entity extends Aggregate<any>> {
  entries: Entity[];
}
