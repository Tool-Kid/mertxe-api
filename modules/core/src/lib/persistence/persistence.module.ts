import { ClassProvider, DynamicModule, Module } from '@nestjs/common';
import { PersistenceModuleFactory } from './factory';

export interface PersistenceModuleForRootOptions {
  adapter: PersistenceAdapterNameType;
}

export interface PersistenceModuleForFeatureOptions {
  repositories: ClassProvider<any>[];
}

export enum PersistenceAdapterName {
  SUPABASE = 'supabase',
}

export type PersistenceAdapterNameType = `${PersistenceAdapterName}`;

@Module({})
export class PersistenceModule {
  static forRoot(options: PersistenceModuleForRootOptions): DynamicModule {
    const module = PersistenceModuleFactory.buildForRootForAdapter(
      PersistenceAdapterName.SUPABASE
    );
    return {
      module: PersistenceModule,
      imports: [module()],
    };
  }

  static forFeature(
    options: PersistenceModuleForFeatureOptions
  ): DynamicModule {
    const module = PersistenceModuleFactory.buildForFeatureForAdapter(
      PersistenceAdapterName.SUPABASE,
      options
    )();
    return {
      module: PersistenceModule,
      imports: [module],
      exports: [module],
    };
  }
}
