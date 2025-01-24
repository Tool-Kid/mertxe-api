import { ApiOperation } from './operation';
import { ApiGroup, ApiOperationGroup } from './operation-group';
import {
  AuthOperationName,
  ChallengesOperationName,
  ContributionsOperationName,
  OperationName,
  ScoringOperationName,
  TimeClockOperationName,
  UserProfileOperationName,
} from './operation-name';
import { OperationType } from './operation-type';
import { Role } from './role';

interface ApiSpec {
  name: string;
  description: string;
  groups: ApiOperationGroup[];
}

export function getOperation(
  groupName: ApiGroup,
  operationName: OperationName
): ApiOperation {
  const apiGroup = API_SPEC.groups.find((group) => group.name === groupName);
  if (!apiGroup) {
    throw new Error(`No ApiGroup find for ${groupName}`);
  }
  const operation = apiGroup.operations.find(
    (operation) => operation.name === operationName
  );
  if (!operation) {
    throw new Error(
      `No operation find for group ${groupName} and name ${operationName}`
    );
  }
  return operation;
}

export const API_SPEC: ApiSpec = {
  name: 'Mertxe API',
  description: 'The Mertxe API description',
  groups: [
    {
      name: ApiGroup.AUTH,
      operations: [
        {
          name: AuthOperationName.REGISTER,
          description: 'Register a new user with system',
          type: OperationType.CREATE,
          roles: [Role.ANY],
          path: 'auth/register',
        },
        {
          name: AuthOperationName.LOGIN,
          description: 'Authenticate user with system',
          type: OperationType.CREATE,
          roles: [Role.ANY],
          path: 'auth/login',
        },
      ],
    },
    {
      name: ApiGroup.USER_PROFILE,
      operations: [
        {
          name: UserProfileOperationName.GET_USER_PROFILE,
          description: 'Get the user profile information',
          type: OperationType.RETRIEVE,
          roles: [Role.USER],
          path: 'user-profile',
        },
      ],
    },
    {
      name: ApiGroup.TIME_CLOCK,
      operations: [
        {
          name: TimeClockOperationName.GET_TIME_CLOCK_RECORDS,
          description: 'Retrieve all time-clock records for user',
          type: OperationType.RETRIEVE,
          roles: [Role.USER],
          path: 'time-clock-records',
        },
        {
          name: TimeClockOperationName.CLOCK_IN,
          description: 'Clock in with system. Time starts until you clock out.',
          type: OperationType.CREATE,
          roles: [Role.USER],
          path: 'clock-in',
        },
        {
          name: TimeClockOperationName.CLOCK_OUT,
          description:
            'Clock out with system. A new time clock record will be stored and points will be computed',
          type: OperationType.CREATE,
          roles: [Role.USER],
          path: 'clock-out',
        },
      ],
    },
    {
      name: ApiGroup.SCORING,
      operations: [
        {
          name: ScoringOperationName.GET_SCORING_RECORDS,
          description: 'Retrieve all Scoring records',
          type: OperationType.RETRIEVE,
          roles: [Role.USER],
          path: 'scoring-records',
        },
      ],
    },
    {
      name: ApiGroup.CONTRIBUTIONS,
      operations: [
        {
          name: ContributionsOperationName.GET_CONTRIBUTIONS,
          description: 'Retrieves a contributions for user',
          type: OperationType.RETRIEVE,
          roles: [Role.USER],
          path: 'contributions',
        },
        {
          name: ContributionsOperationName.ADD_CONTRIBUTION,
          description:
            'Create a new Contribution. This contribution requires Admin approval',
          type: OperationType.CREATE,
          roles: [Role.USER],
          path: 'contributions',
        },
        {
          name: ContributionsOperationName.APPROVE_CONTRIBUTION,
          description: 'Approves a user contribution',
          type: OperationType.UPDATE,
          roles: [Role.ADMIN],
          path: 'contributions/:id/approve',
        },
      ],
    },
    {
      name: ApiGroup.CHALLENGES,
      operations: [
        {
          name: ChallengesOperationName.GET_ACTIVE_CHALLENGES,
          description: 'Get active Challenges for a User',
          type: OperationType.RETRIEVE,
          roles: [Role.USER],
          path: 'challenges/active',
        },
        {
          name: ChallengesOperationName.CLAIM_CHALLENGE_REWARD,
          description: 'Claim the Reward for a Challenge',
          type: OperationType.CREATE,
          roles: [Role.USER],
          path: 'challenges/:id/claim',
        },
      ],
    },
  ],
};
