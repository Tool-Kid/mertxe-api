const SCOPES = {
  AUTH: 'auth',
};

function event<Scope extends typeof SCOPES>(scope: keyof Scope, name: string) {
  const scopeValue = SCOPES[scope as any];
  return `${scopeValue}.${name}`;
}

export const EVENTS = {
  USER_REGISTERED: event('AUTH', 'user_registered'),
};
