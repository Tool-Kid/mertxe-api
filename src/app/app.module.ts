import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { PersistenceModule } from '@mertxe/core';
import { TimeClockModule } from '@modules/time-clock/time-clock.module';
import { UserProfileModule } from '@modules/user-profile/user-profile.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from '@modules/auth/infra/passport';
import { ScoringModule } from '@modules/scoring/scoring.module';
import { CqrsModule } from '@nestjs/cqrs';
import { EventsModule } from '@mertxe/core';
import { ClsModule } from 'nestjs-cls';
import { ContributionsModule } from '@modules/contributions/contributions.module';
import { CatchExceptionFilter } from '@mertxe/core';
import { RolesGuard } from '@modules/auth/infra/passport/jwt/roles.guard';
import { ChallengesModule } from '@modules/challenges/challenges.module';
import { NotificationsModule } from '../../modules/core/src/lib/notifications';

const CORE_MODULES = [
  PersistenceModule.forRoot({ adapter: 'supabase' }),
  EventsModule.forRoot(),
  NotificationsModule.forRoot({
    publishers: [
      {
        type: 'NODEMAILER',
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          email: process.env.GOOGLE_GMAIL_EMAIL,
          password: process.env.GOOGLE_GMAIL_PASSWORD,
        },
      },
    ],
  }),
];

const THIRD_PARTY_MODULES = [
  CqrsModule.forRoot(),
  ClsModule.forRoot({
    middleware: {
      mount: true,
      setup: (cls, req) => {
        cls.set('jwt_token', req.headers['authorization']);
        cls.set('email', req.body.email);
        cls.set('password', req.body.password);
      },
    },
  }),
];

const FEATURE_MODULES = [
  AuthModule,
  TimeClockModule,
  UserProfileModule,
  ScoringModule,
  ContributionsModule,
  ChallengesModule,
];

@Module({
  imports: [...THIRD_PARTY_MODULES, ...FEATURE_MODULES, ...CORE_MODULES],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CatchExceptionFilter,
    },
  ],
})
export class AppModule {}
