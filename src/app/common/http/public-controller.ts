import { applyDecorators, Controller } from '@nestjs/common';

export const PublicController = (path: string) =>
  applyDecorators(Controller(path));
