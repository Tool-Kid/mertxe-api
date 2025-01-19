import { GetUserProfileResponse } from './user-profile.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserProfileQry } from '../../../application/get-user-profile/get-user-profile.qry';
import { toDto } from '@common/utils/serialization';
import { UserProfile } from '../../../domain/user-profile';
import { execute } from '@common/cqrs';
import { Controller, IController, HandleOperation } from '@common/http';
import { ApiGroup, UserProfileOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.USER_PROFILE,
  operation: UserProfileOperationName.GET_USER_PROFILE,
})
export class UserProfileController implements IController {
  constructor(private readonly queryBus: QueryBus) {}

  @HandleOperation()
  async handle(): Promise<GetUserProfileResponse> {
    const profile = await execute<UserProfile>({
      bus: this.queryBus,
      payload: new GetUserProfileQry(),
    });
    return toDto(GetUserProfileResponse, { scoring: profile.get('scoring') });
  }
}
