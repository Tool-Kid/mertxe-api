import { EventsHandler, IEventsHandler } from '@common/events';
import { UserProfileRepository } from '@modules/user-profile/domain/user-profile.repo';
import { APP_EVENTS } from '@common/events';

@EventsHandler(APP_EVENTS.SCORING__RECORD_ADDED)
export class UpdateScoringOnChangesEventHdlr
  implements IEventsHandler<any, any>
{
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async handle(event: any): Promise<any> {
    const userProfile = await this.userProfileRepository.getUserProfile();
    await this.userProfileRepository.updateScoring(
      userProfile.get('scoring') + event.data.points
    );
  }
}
