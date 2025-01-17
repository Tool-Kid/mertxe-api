import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserProfile } from '../../domain/user-profile';
import { UserProfileRepository } from '../../domain/user-profile.repo';

export class GetUserProfileQry {}

@QueryHandler(GetUserProfileQry)
export class GetUserProfileQryHdlr
  implements IQueryHandler<GetUserProfileQry, UserProfile>
{
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async execute(query: GetUserProfileQry): Promise<UserProfile> {
    const profile = await this.userProfileRepository.getUserProfile();
    return profile;
  }
}
