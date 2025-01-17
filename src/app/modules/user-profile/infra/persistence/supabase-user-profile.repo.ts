import { ISupabaseRepository, SupabaseRepository } from '@common/supabase';
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
    await this.create(profile);
    return profile as UserProfile;
  }

  async getUserProfile(): Promise<UserProfile> {
    const profiles = await this.findOne();
    return profiles;
  }

  async updateScoring(scoring: number): Promise<UserProfile> {
    const profile = await this.findOne();
    profile.set('scoring').to(scoring);
    await this.update(profile);
    return profile;
  }
}
