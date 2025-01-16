import { Aggregate, Entity } from 'types-ddd';

export function mapToRaw<Entry extends Aggregate<any> | Entity<any>>(
  entities: Array<Entry>
): ReturnType<Entry['getRaw']>[] {
  return entities.map((entity) => entity.getRaw()) as ReturnType<
    Entry['getRaw']
  >[];
}
