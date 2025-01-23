enum AppScope {
  AUTH = 'auth',
  TIMECLOCK = 'time-clock',
  SCORING = 'scoring',
}

type Event<Name extends string> = `${AppScope}.${Name}`;
type AppEvent = Event<string>;
type AppEvents = {
  [key in keyof typeof AppScope]: { [key: string]: AppEvent };
};

export const APP_EVENTS = {
  AUTH: {
    USER_REGISTERED: 'auth.user_registered',
  },
  TIMECLOCK: {
    SESSION_FINISHED: 'time-clock.session_finished',
  },
  SCORING: {
    RECORD_ADDED: 'scoring.record_added',
  },
} as const;
