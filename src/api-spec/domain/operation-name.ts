export enum AuthOperationName {
  REGISTER = 'Register',
  LOGIN = 'Login',
}

export enum UserProfileOperationName {
  GET_USER_PROFILE = 'Get User Profile',
}

export enum TimeClockOperationName {
  GET_TIME_CLOCK_RECORDS = 'Get TimeClock records',
  CLOCK_IN = 'Clock In',
  CLOCK_OUT = 'Clock Out',
}

export enum ScoringOperationName {
  GET_SCORING_RECORDS = 'Retrieve Scoring records',
}

export enum ContributionsOperationName {
  GET_CONTRIBUTIONS = 'Get Contributions',
  ADD_CONTRIBUTION = 'Add a new Contribution',
  APPROVE_CONTRIBUTION = 'Approve a Contribution',
}

export type OperationName =
  | AuthOperationName
  | UserProfileOperationName
  | TimeClockOperationName
  | ScoringOperationName
  | ContributionsOperationName;
