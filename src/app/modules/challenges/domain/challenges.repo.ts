import { Collection } from '@mertxe/core';
import { Challenge } from './challenge';

export abstract class ChallengesRepository {
  abstract getActiveChallenges(): Promise<Collection<Challenge>>;
  abstract completeChallenge(): Promise<Challenge>;
}
