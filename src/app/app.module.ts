import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SupabaseClientModule } from '@common/supabase-client/supabase-client.module';
import { TimeClockModule } from './modules/time-clock/time-clock.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './modules/auth/infra/passport';

@Module({
  imports: [
    SupabaseClientModule.forRoot(),
    AuthModule,
    TimeClockModule,
    UserProfileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
