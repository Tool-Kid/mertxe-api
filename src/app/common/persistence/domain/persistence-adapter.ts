import { Type } from '@nestjs/common';
import { Entity } from 'types-ddd';
import { Criteria } from './criteria';

export interface PersistenceAdapter<RepositoryEntity extends Entity<any>> {
  readonly tableName: string;
  readonly entity: Type<RepositoryEntity>;

  findAll(): Promise<RepositoryEntity[]>;
  findOne(criteria?: Criteria): Promise<RepositoryEntity>;
  create(entity: Partial<RepositoryEntity>): Promise<Partial<RepositoryEntity>>;
  update(entity: Partial<RepositoryEntity>): Promise<Partial<RepositoryEntity>>;
}
