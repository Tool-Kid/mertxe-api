import { Module } from '@nestjs/common';
import { UserProfileRepository } from './domain/user-profile.repo';
import { SupabaseUserProfileRepository } from './infra/persistence/supabase-user-profile.repo';
import { UserProfileController } from './infra/http/user-profile.controller';

@Module({
  providers: [
    { provide: UserProfileRepository, useClass: SupabaseUserProfileRepository },
  ],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
