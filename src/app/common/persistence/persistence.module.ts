import { DynamicModule, Module } from '@nestjs/common';

interface PersistenceModuleOptions {
  adapter: 'SUPABASE';
}

@Module({})
export class PersistenceModule {
  static forRoot(options: PersistenceModuleOptions): DynamicModule {
    return {
      module: PersistenceModule,
    };
  }
}
