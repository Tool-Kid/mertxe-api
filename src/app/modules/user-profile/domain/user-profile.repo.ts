import { UserProfile } from './user-profile';

export abstract class UserProfileRepository {
  abstract setInitialData(profile: Partial<UserProfile>): Promise<UserProfile>;
  abstract getUserProfile(): Promise<UserProfile>;
}
