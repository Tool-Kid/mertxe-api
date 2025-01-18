import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const PrivateController = (path: string) =>
  applyDecorators(Controller(path), ApiBearerAuth());

