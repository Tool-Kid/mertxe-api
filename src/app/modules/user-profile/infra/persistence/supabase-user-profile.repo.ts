import { SupabaseClient } from '@common/supabase-client';
import { UserProfile } from '../../domain/user-profile';
import { UserProfileRepository } from '../../domain/user-profile.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseUserProfileRepository implements UserProfileRepository {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async setInitialData(profile: Partial<UserProfile>): Promise<UserProfile> {
    const defaultProfile: Partial<UserProfile> = {
      id: profile.id,
      scoring: 1000,
    };

    await this.supabaseClient.instance
      .from('UserProfile')
      .insert([
        { user_id: defaultProfile.id, scoring: defaultProfile.scoring },
      ]);

    return {
      id: defaultProfile.id,
      scoring: defaultProfile.scoring,
    };
  }

  async getUserProfile(): Promise<UserProfile> {
    const client = await this.supabaseClient.getClient();
    const { data } = await client.from('UserProfile').select('*');
    return {
      id: '',
      scoring: data[0].scoring,
    };
  }
}
