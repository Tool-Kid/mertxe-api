import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { GetUserProfileResponse } from './user-profile.dto';
import { UserProfileRepository } from '../../../domain/user-profile.repo';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserProfileQry } from '../../../application/get-user-profile/get-user-profile.qry';
import { toDto } from '@common/utils/serialization';
import { UserProfile } from '../../../domain/user-profile';
import { execute } from '@common/cqrs';

@Controller('user-profile')
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
