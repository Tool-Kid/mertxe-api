import { Aggregate } from 'types-ddd';

export interface Collection<Entity extends Aggregate<any>> {
  entries: Entity[];
}
