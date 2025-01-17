import {
  ISupabaseRepository,
  SupabaseClient,
  SupabaseRepository,
} from '@common/supabase';
import { UserProfile } from '../../domain/user-profile';
import { UserProfileRepository } from '../../domain/user-profile.repo';

@SupabaseRepository({
  table: 'UserProfiles',
  entity: UserProfile,
})
export class SupabaseUserProfileRepository
  extends ISupabaseRepository<UserProfile>
  implements UserProfileRepository
{
  async setInitialData(profile: Partial<UserProfile>): Promise<UserProfile> {
    const client = await this.getClient();

    await this.create(profile);
    await client
      .from('UserProfiles')
      .insert([
        { user_id: profile.get('id'), scoring: profile.get('scoring') },
      ]);

    await this.create(profile);

    return profile as UserProfile;
  }

  async getUserProfile(): Promise<UserProfile> {
    const profiles = await this.findAll();
    return profiles[0];
  }
}
