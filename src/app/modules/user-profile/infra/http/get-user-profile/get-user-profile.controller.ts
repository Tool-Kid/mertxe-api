import { Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/api-spec/infra/openapi';
import { GetUserProfileResponse } from './user-profile.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserProfileQry } from '../../../application/get-user-profile/get-user-profile.qry';
import { toDto } from '@common/utils/serialization';
import { UserProfile } from '../../../domain/user-profile';
import { execute } from '@common/cqrs';
import { PrivateController } from '@common/http';

@PrivateController('user-profile')
@ApiTags(OPEN_API_TAG.USER_PROFILE)
export class UserProfileController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getProfile(): Promise<GetUserProfileResponse> {
    const profile = await execute<UserProfile>({
      bus: this.queryBus,
      payload: new GetUserProfileQry(),
    });
    return toDto(GetUserProfileResponse, { scoring: profile.get('scoring') });
  }
}
