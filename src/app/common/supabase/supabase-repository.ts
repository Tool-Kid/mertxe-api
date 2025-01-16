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

  private toDomain(
    entry: ReturnType<RepositoryEntity['getRaw']>
  ): RepositoryEntity {
    return new this.entity(toCamelCase(entry));
  }

  private toPersistence(
    data: RepositoryEntity
  ): Readonly<ReturnType<RepositoryEntity['getRaw']>> {
    return toSnakeCase(data.getRaw());
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
    const { data } = await client
      .from(this.tableName)
      .insert(this.toPersistence(entity as any))
      .select('*');
    return this.toDomain(data.at(0));
  }

  async update(
    entity: Partial<RepositoryEntity>
  ): Promise<Partial<RepositoryEntity>> {
    const client = await this.getClient();
    const { data } = await client
      .from(this.tableName)
      .update(this.toPersistence(entity as any))
      .select('*');
    return data.at(0);
  }
}
