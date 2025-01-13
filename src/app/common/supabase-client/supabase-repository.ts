import { SupabaseClient } from './supabase-client';

interface SupabaseRepositoryParams {
  tableName: string;
}

export abstract class SupabaseRepository {
  readonly client: SupabaseClient;
  readonly tableName: string;

  constructor(params: SupabaseRepositoryParams) {
    this.tableName = params.tableName;
  }
}
