import { DynamicModule } from '@nestjs/common';
import { PersistenceAdapterName } from './persistence.module';
import { SupabaseModule } from './infra';

export class PersistenceModuleFactory {
  static buildForRootForAdapter(
    adapter: PersistenceAdapterName
  ): () => DynamicModule {
    switch (adapter) {
      case PersistenceAdapterName.SUPABASE:
        return () => SupabaseModule.forRoot();
      default:
        throw new Error(`Unknown adapter name: ${adapter}`);
    }
  }

  static buildForFeatureForAdapter(
    adapter: PersistenceAdapterName,
    options: any
  ): () => DynamicModule {
    switch (adapter) {
      case PersistenceAdapterName.SUPABASE:
        return () => SupabaseModule.forFeature(options);
      default:
        throw new Error(`Unknown adapter name: ${adapter}`);
    }
  }
}
