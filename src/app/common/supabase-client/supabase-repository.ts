/*import { Injectable } from '@nestjs/common';
import { SupabaseClient } from './supabase-client';

interface SupabaseRepositoryParams<TableName extends string> {
  tableName: TableName;
}

export abstract class ISupabaseRepository<TableName extends string> {
  readonly client: SupabaseClient;
  readonly tableName: TableName;

  constructor(params: SupabaseRepositoryParams<TableName>) {
    this.tableName = params.tableName;
  }
}

export function SupabaseRepository(): ClassDecorator {
  return (target: any) => {
    Injectable()(target); // Marca la clase como inyectable

    const originalConstructor = target;

    // Sobrescribe el constructor
    function newConstructor(...args: any[]) {
      const instance = new originalConstructor(...args);

      // Inyecta el cliente Supabase si no está ya configurado
      if (!instance.client) {
        const client = Reflect.getMetadata(SupabaseClient, SupabaseClient);
        if (!client) {
          throw new Error('SupabaseClient is not available.');
        }
        instance.client = client;
      }

      return instance;
    }

    // Mantiene la metadata original
    Object.defineProperty(newConstructor, 'name', {
      value: originalConstructor.name,
    });
    Reflect.setPrototypeOf(newConstructor, originalConstructor);
    Reflect.defineMetadata(SupabaseClient, SupabaseClient, target);

    return newConstructor as any;
  };
}

@SupabaseRepository()
export class FooRepo extends ISupabaseRepository<'Foo'> {
  async getFoo(): Promise<Foo> {
    return this.client.instance.from();
  }
}
*/
