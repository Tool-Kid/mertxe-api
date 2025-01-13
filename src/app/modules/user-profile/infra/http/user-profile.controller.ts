import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { FindUserProfileResponse } from './user-profile.dto';
import { UserProfileRepository } from '../../domain/user-profile.repo';

@Controller('user-profile')
@ApiTags(OPEN_API_TAG.USER_PROFILE)
export class UserProfileController {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  @Get()
  async getProfile(): Promise<FindUserProfileResponse> {
    const profile = await this.userProfileRepository.getUserProfile();
    return {
      profile,
    };
  }
}
