import { Entity } from 'types-ddd';
import { Criteria } from './criteria';
import { Class } from '@common/types';

export interface PersistenceAdapter<RepositoryEntity extends Entity<any>> {
  readonly tableName: string;
  readonly entity: Class<RepositoryEntity>;

  findAll(): Promise<RepositoryEntity[]>;
  findOne(criteria?: Criteria): Promise<RepositoryEntity>;
  create(entity: Partial<RepositoryEntity>): Promise<Partial<RepositoryEntity>>;
  update(entity: Partial<RepositoryEntity>): Promise<Partial<RepositoryEntity>>;
}
