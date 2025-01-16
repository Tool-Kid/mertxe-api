import { applyDecorators, Injectable } from '@nestjs/common';
import { SupabaseClient } from './supabase-client';

interface InternalISupabaseRepository<Entity> {
  readonly client: SupabaseClient;
  readonly tableName: string;
  findAll(): Promise<Entity[]>;
  create(entity: Partial<Entity>): Promise<Partial<Entity>>;
  update(entity: Partial<Entity>): Promise<Partial<Entity>>;
}

export class ISupabaseRepository<Entity>
  implements InternalISupabaseRepository<Entity>
{
  readonly client: SupabaseClient;
  readonly tableName: string;

  async getClient() {
    return await this.client.getClient();
  }

  async findAll(): Promise<Entity[]> {
    const client = await this.getClient();
    const { data } = await client.from(this.tableName).select('*');
    return data;
  }

  async create(entity: Partial<Entity>): Promise<Partial<Entity>> {
    const client = await this.getClient();
    await client.from(this.tableName).insert(entity).select('*');
    return entity;
  }

  async update(entity: Partial<Entity>): Promise<Partial<Entity>> {
    const client = await this.getClient();
    await client.from(this.tableName).update(entity).select('*');
    return entity;
  }
}

interface SupabaseRepositoryOptions {
  table: string;
}

// Implementación del decorador
export function SupabaseRepositoryDecorator(
  options: SupabaseRepositoryOptions
): ClassDecorator {
  return (target: Function) => {
    target.prototype.tableName = options.table;
    applyDecorators(Injectable);
  };
}

export const SupabaseRepository = (options: SupabaseRepositoryOptions) =>
  applyDecorators(SupabaseRepositoryDecorator(options), Injectable);
