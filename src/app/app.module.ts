import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SupabaseClientModule } from '@common/supabase-client/supabase-client.module';
import { TimeClockModule } from './modules/time-clock/time-clock.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './modules/auth/infra/passport';
import { CatchExceptionFilter } from '@common/error/catch-exception.filter';
import { ScoringModule } from './modules/scoring/scoring.module';

@Module({
  imports: [
    SupabaseClientModule.forRoot(),
    AuthModule,
    TimeClockModule,
    UserProfileModule,
    ScoringModule,
  ],
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
