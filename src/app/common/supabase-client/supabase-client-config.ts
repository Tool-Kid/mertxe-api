export class SupabaseClientConfig {
  readonly url = process.env.SUPABASE_URL;
  readonly token = process.env.SUPABASE_TOKEN;
}
