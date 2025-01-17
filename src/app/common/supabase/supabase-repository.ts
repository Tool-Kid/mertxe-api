import { SupabaseClient } from './supabase-client';
import { Type } from '@nestjs/common';
import { toCamelCase, toSnakeCase } from '@common/utils';
import { Entity } from 'types-ddd';

interface InternalISupabaseRepository<RepositoryEntity extends Entity<any>> {
  readonly client: SupabaseClient;
  readonly tableName: string;
  readonly entity: Type<RepositoryEntity>;

  findAll(): Promise<RepositoryEntity[]>;
  create(entity: Partial<RepositoryEntity>): Promise<Partial<RepositoryEntity>>;
  update(entity: Partial<RepositoryEntity>): Promise<Partial<RepositoryEntity>>;
}

export class ISupabaseRepository<RepositoryEntity extends Entity<any>>
  implements InternalISupabaseRepository<RepositoryEntity>
{
  readonly client: SupabaseClient;
  readonly tableName: string;
  readonly entity: Type<RepositoryEntity>;

  async getClient() {
    return await this.client.getClient();
  }

  async getUserId() {
    return (await (await this.getClient()).auth.getUser()).data.user.id;
  }

  private async mergeEntityWithUserContext(entity: Partial<RepositoryEntity>) {
    const userId = await this.getUserId();
    entity.set('userId').to(userId);
    return entity as any;
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

  async findAll(): Promise<RepositoryEntity[]> {
    const client = await this.getClient();
    const { data } = await client.from(this.tableName).select('*');
    const mappedData = data.map((entry) => this.toDomain(entry));
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
