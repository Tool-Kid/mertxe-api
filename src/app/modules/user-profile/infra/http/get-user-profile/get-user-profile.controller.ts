import { GetUserProfileResponse } from './user-profile.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserProfileQry } from '@modules/user-profile/application/get-user-profile/get-user-profile.qry';
import { toDto } from '@mertxe/core';
import { UserProfile } from '@modules/user-profile/domain/user-profile';
import { execute } from '@mertxe/core';
import { Controller, IController, HandleOperation } from '@mertxe/core';
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
