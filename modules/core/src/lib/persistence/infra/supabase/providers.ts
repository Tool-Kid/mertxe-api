import { ClassProvider, FactoryProvider } from '@nestjs/common';
import { SupabaseClient } from './supabase-client';
import { SupabaseAdapter } from './supabase-adapter';

export function registerRepositories(
  repositories: ClassProvider[]
): FactoryProvider[] {
  return repositories.map((provider) => ({
    provide: provider.provide,
    useFactory: (client: SupabaseClient) => {
      const repositoryInstance = new provider.useClass();

      const tableNameKey = `${provider.useClass.name}__tableName`;
      const entityKey = `${provider.useClass.name}__entity`;
      const tableName = Reflect.getMetadata(tableNameKey, provider.useClass);
      const entity = Reflect.getMetadata(entityKey, provider.useClass);

      repositoryInstance.adapter = new SupabaseAdapter();
      repositoryInstance.adapter.client = client;
      repositoryInstance.adapter.tableName = tableName;
      repositoryInstance.adapter.entity = entity;

      return repositoryInstance;
    },
    inject: [SupabaseClient],
  }));
}
