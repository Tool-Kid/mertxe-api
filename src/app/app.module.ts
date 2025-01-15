import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SupabaseClientModule } from '@common/supabase-client/supabase-client.module';
import { TimeClockModule } from './modules/time-clock/time-clock.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './modules/auth/infra/passport';
import { CatchExceptionFilter } from '@common/error/catch-exception.filter';
import { ScoringModule } from './modules/scoring/scoring.module';
import { EventsModule } from './common/events/events.module';
import { CqrsModule } from '@nestjs/cqrs';

const THIRD_PARTY_MODULES = [
  SupabaseClientModule.forRoot(),
  EventsModule,
  CqrsModule.forRoot(),
];

const FEATURE_MODULES = [
  AuthModule,
  TimeClockModule,
  UserProfileModule,
  ScoringModule,
];

@Module({
  imports: [...THIRD_PARTY_MODULES, ...FEATURE_MODULES],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CatchExceptionFilter,
    },
  ],
})
export class AppModule {}
