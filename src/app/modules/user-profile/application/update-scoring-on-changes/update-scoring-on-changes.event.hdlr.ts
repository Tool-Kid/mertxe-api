import { EventsHandler, IEventsHandler } from '@common/events';
import { UserProfileRepository } from '@modules/user-profile/domain/user-profile.repo';
import { ScoringRecordAddedEvent } from 'src/app/modules/scoring/domain/scoring-record-added.event';

@EventsHandler(ScoringRecordAddedEvent)
export class UpdateScoringOnChangesEventHdlr
  implements IEventsHandler<ScoringRecordAddedEvent, any>
{
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async execute(event: ScoringRecordAddedEvent): Promise<any> {
    const userProfile = await this.userProfileRepository.getUserProfile();
    await this.userProfileRepository.updateScoring(
      userProfile.get('scoring') + event.points
    );
  }
}
