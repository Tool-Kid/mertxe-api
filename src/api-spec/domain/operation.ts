import { OperationName } from './operation-name';
import { OperationType } from './operation-type';
import { Role } from './role';

export interface ApiOperation {
  name: OperationName;
  description: string;
  type: OperationType;
  roles: Role[];
  path: string;
}
