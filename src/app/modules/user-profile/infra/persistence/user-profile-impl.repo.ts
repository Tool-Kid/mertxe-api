import { PersistenceRepository, Repository } from '@common/persistence';
import { UserProfile } from '../../domain/user-profile';
import { UserProfileRepository } from '../../domain/user-profile.repo';

@Repository({
  table: 'UserProfiles',
  entity: UserProfile,
})
export class UserProfileRepositoryImpl
  extends PersistenceRepository<UserProfile>
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
