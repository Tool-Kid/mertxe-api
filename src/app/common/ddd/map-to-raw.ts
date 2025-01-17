import { Aggregate, Entity } from 'types-ddd';

export function mapArrayToRaw<Entry extends Aggregate<any> | Entity<any>>(
  entities: Array<Entry>
): ReturnType<Entry['getRaw']>[] {
  return entities.map((entity) => entity.getRaw()) as ReturnType<
    Entry['getRaw']
  >[];
}

export function mapToRaw<Entry extends Aggregate<any> | Entity<any>>(
  entity: Entry
): ReturnType<Entry['getRaw']> {
  return entity.getRaw() as ReturnType<Entry['getRaw']>;
}