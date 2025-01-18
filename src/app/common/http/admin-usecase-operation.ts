import { applyDecorators } from '@nestjs/common';
import { UseCaseOperation, UseCaseOperationProps } from './usecase-operation';

export const AdminUseCaseOperation = (props: UseCaseOperationProps) =>
  applyDecorators(
    UseCaseOperation({
      title: `${props.title}. [Reserved for user roles: ADMIN]`,
      description: props.description,
    })
  );
