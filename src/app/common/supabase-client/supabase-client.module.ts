import { DynamicModule, Global, Module } from '@nestjs/common';
import { SupabaseClient } from './supabase-client';
import { SupabaseClientConfig } from './supabase-client-config';
import { ClsModule } from 'nestjs-cls';

@Module({})
@Global()
export class SupabaseClientModule {
  static forRoot(): DynamicModule {
    return {
      imports: [ClsModule],
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
