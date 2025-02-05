import { Aggregate } from 'modules/core/src/lib/ddd';
import { Criteria } from './criteria';
import { PersistenceAdapter } from './persistence-adapter';
import { Class } from 'modules/core/src/lib/types';

export class PersistenceRepository<RepositoryEntity extends Aggregate<any>> {
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
