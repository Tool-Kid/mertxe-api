import { ClassProvider, DynamicModule, Module } from '@nestjs/common';
import { SupabaseClient } from './supabase-client';
import { SupabaseClientConfig } from './supabase-client-config';
import { ClsModule } from 'nestjs-cls';
import { registerRepositories } from './providers';

interface SupabaseClientModuleForFeatureOptions {
  repositories: ClassProvider<any>[];
}

@Module({})
export class SupabaseModule {
  static forRoot(): DynamicModule {
    return {
      imports: [ClsModule],
      module: SupabaseModule,
      global: true,
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

  static forFeature(
    options?: SupabaseClientModuleForFeatureOptions
  ): DynamicModule {
    const REPOSITORY_PROVIDERS = registerRepositories(options.repositories);
    return {
      imports: [ClsModule],
      module: SupabaseModule,
      providers: [
        {
          provide: SupabaseClientConfig,
          useClass: SupabaseClientConfig,
        },
        {
          provide: SupabaseClient,
          useClass: SupabaseClient,
        },
        ...REPOSITORY_PROVIDERS,
      ],
      exports: [...REPOSITORY_PROVIDERS],
    };
  }
}
