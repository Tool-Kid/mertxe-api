import { DynamicModule, Global, Module } from '@nestjs/common';
import { SupabaseClient } from './supabase-client';
import { SupabaseClientConfig } from './supabase-client-config';

@Module({})
@Global()
export class SupabaseClientModule {
  static forRoot(): DynamicModule {
    return {
      module: SupabaseClientModule,
      providers: [
        {
          provide: SupabaseClientConfig,
          useValue: new SupabaseClientConfig(),
        },
        {
          provide: SupabaseClient,
          useClass: SupabaseClient,
        },
      ],
      exports: [SupabaseClient, SupabaseClientConfig],
    };
  }
}
