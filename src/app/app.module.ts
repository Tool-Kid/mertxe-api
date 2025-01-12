import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SupabaseClientModule } from './modules/supabase-client/supabase-client.module';
import { TimeClockModule } from './modules/time-clock/time-clock.module';

@Module({
  imports: [SupabaseClientModule.forRoot(), AuthModule, TimeClockModule],
  providers: [],
})
export class AppModule {}
