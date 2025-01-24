import { Exception } from '../exception';
import { ExceptionType } from '../exception-type';

export class ResourceNotFoundException extends Exception {
  constructor(resource: string, id: string | number) {
    super({
      message: `Not found ${resource} with id: ${id}`,
      type: ExceptionType.RESOURCE_NOT_FOUND,
    });
  }
}
