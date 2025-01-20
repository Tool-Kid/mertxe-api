import { Entity } from 'types-ddd';
import { Criteria } from './criteria';
import { PersistenceAdapter } from './persistence-adapter';
import { Class } from '@common/types';

export class PersistenceRepository<RepositoryEntity extends Entity<any>> {
  readonly tableName: string;
  readonly entity: Class<RepositoryEntity>;
  readonly adapter: PersistenceAdapter<RepositoryEntity>;

  async findAll(): Promise<RepositoryEntity[]> {
    return await this.adapter.findAll();
  }

  async findOne(criteria?: Criteria): Promise<RepositoryEntity> {
    return await this.adapter.findOne(criteria);
  }

  async create(
    entity: Partial<RepositoryEntity>
  ): Promise<Partial<RepositoryEntity>> {
    return await this.adapter.create(entity);
  }
  async update(
    entity: Partial<RepositoryEntity>
  ): Promise<Partial<RepositoryEntity>> {
    return await this.adapter.update(entity);
  }
}
