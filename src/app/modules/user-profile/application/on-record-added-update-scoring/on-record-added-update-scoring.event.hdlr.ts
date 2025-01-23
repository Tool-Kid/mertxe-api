import { EventHandler, IEventHandler } from '@common/events';
import { UserProfileRepository } from '@modules/user-profile/domain/user-profile.repo';
import { APP_EVENTS } from '@common/events';

@EventHandler(APP_EVENTS.SCORING.RECORD_ADDED)
export class OnRecordAddedUpdateScoringEventHdlr
  implements IEventHandler<any, any>
{
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async handle(event: any): Promise<any> {
    const userProfile = await this.userProfileRepository.getUserProfile();
    await this.userProfileRepository.updateScoring(
      userProfile.get('scoring') + event.data.points
    );
  }
}
