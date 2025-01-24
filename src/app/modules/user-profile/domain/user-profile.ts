import { Aggregate } from '@mertxe/core';

interface UserProfileProps {
  id: number;
  scoring: number;
  userId: string;
  createdAt: string;
}

export class UserProfile extends Aggregate<UserProfileProps> {}
