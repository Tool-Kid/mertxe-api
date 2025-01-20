import { SupabaseClient } from './supabase-client';
import { toCamelCase, toSnakeCase } from '@common/utils';
import { Entity } from 'types-ddd';
import { Criteria, PersistenceAdapter } from '@common/persistence';
import { Class } from '@common/types';

export class SupabaseAdapter<RepositoryEntity extends Entity<any>>
  implements PersistenceAdapter<RepositoryEntity>
{
  readonly tableName: string;
  readonly entity: Class<RepositoryEntity>;
  readonly client: SupabaseClient;

  async getClient() {
    return await this.client.getClient();
  }

  async getUserId() {
    return (await (await this.getClient()).auth.getUser()).data.user.id;
  }

  private async mergeEntityWithUserContext(entity: Partial<RepositoryEntity>) {
    const userId = await this.getUserId();
    entity.set('userId').to(userId);
    return entity as RepositoryEntity;
  }

  private toDomain(
    entry: ReturnType<RepositoryEntity['getRaw']>
  ): RepositoryEntity {
    return new this.entity(toCamelCase(entry));
  }

  private toPersistence(
    data: RepositoryEntity
  ): Readonly<ReturnType<RepositoryEntity['getRaw']>> {
    const raw = toSnakeCase(data.getRaw()) as any;
    delete raw.updated_at;
    delete raw.created_at;
    return raw;
  }

  async findOne(criteria?: Criteria): Promise<RepositoryEntity> {
    const client = await this.getClient();
    const query = client.from(this.tableName).select('*');
    if (criteria?.filters) {
      for (const [column, operator, value] of criteria.filters) {
        query.filter(column, operator, value);
      }
    }
    const { data } = await query;
    if (!data?.[0]) {
      return null;
    }
    const mappedData = this.toDomain(data[0]);
    return mappedData;
  }

  async findAll(): Promise<RepositoryEntity[]> {
    const client = await this.getClient();
    const { data } = await client.from(this.tableName).select('*');
    const entries = data ?? [];
    const mappedData = entries.map((entry) => this.toDomain(entry));
    return mappedData;
  }

  async create(
    entity: Partial<RepositoryEntity>
  ): Promise<Partial<RepositoryEntity>> {
    const client = await this.getClient();
    const persistData = await this.mergeEntityWithUserContext(entity);

    const { data, error } = await client
      .from(this.tableName)
      .insert(this.toPersistence(persistData))
      .select('*');
    return this.toDomain(data.at(0));
  }

  async update(
    entity: Partial<RepositoryEntity>
  ): Promise<Partial<RepositoryEntity>> {
    const client = await this.getClient();
    const persistData = await this.mergeEntityWithUserContext(entity);

    const to = this.toPersistence(persistData);
    const { id, ...rest } = to;
    const { data, error } = await client
      .from(this.tableName)
      .update(rest)
      .eq('id', id)
      .select('*');

    const domainEntry = this.toDomain(data.at(0));
    return domainEntry;
  }
}
