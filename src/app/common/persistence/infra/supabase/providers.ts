import { ClassProvider, FactoryProvider } from '@nestjs/common';
import { SupabaseClient } from './supabase-client';

export function registerRepositories(
  repositories: ClassProvider[]
): FactoryProvider[] {
  return repositories.map((provider) => ({
    provide: provider.provide,
    useFactory: (client: SupabaseClient) => {
      const repositoryInstance = new provider.useClass();
      repositoryInstance.client = client;
      return repositoryInstance;
    },
    inject: [SupabaseClient],
  }));
}
