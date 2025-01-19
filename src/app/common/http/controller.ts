import {
  Delete,
  Get,
  Controller as NestController,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiGroup,
  getOperation,
  OperationName,
  OperationType,
  Role,
} from 'src/api-spec';
import { UseCaseOperation, UseCaseOperationProps } from './usecase-operation';

const OPERATION_TYPE_MAP = new Map<
  OperationType,
  (path?: string | string[]) => MethodDecorator
>([
  [OperationType.RETRIEVE, Get],
  [OperationType.CREATE, Post],
  [OperationType.UPDATE, Patch],
  [OperationType.DELETE, Delete],
]);

function applyMethodDecorador(
  decorator: () => MethodDecorator,
  target: Function
) {
  decorator()(
    target.prototype,
    'handle',
    Object.getOwnPropertyDescriptor(target.prototype, 'handle')!
  );
}

interface ControllerProps {
  group: ApiGroup;
  operation: OperationName;
}

export interface IController<> {
  handle(...args): Promise<any>;
}

export const Controller = (props: ControllerProps) => {
  const { group: groupName, operation: operationName } = props;
  const operation = getOperation(groupName, operationName);
  return function (constructor: Function) {
    const requiresAuth = !operation.roles.includes(Role.ANY);
    const isPublic = operation.roles.includes(Role.ANY);

    NestController(operation.path)(constructor);
    ApiTags(groupName)(constructor);
    if (requiresAuth) {
      ApiBearerAuth()(constructor);
    }
    if (isPublic) {
      SetMetadata('isPublic', true)(constructor);
    }
    SetMetadata('roles', operation.roles)(constructor);
    

    const useCaseOperationProps: UseCaseOperationProps = {
      title: operation.name,
      description: operation.description,
    };
    const rolesText = `Roles: (${operation.roles
      .toString()
      .replace(',', ', ')})`;
    useCaseOperationProps.title = `${useCaseOperationProps.title}. ${rolesText}`;
    applyMethodDecorador(
      () =>
        UseCaseOperation({
          title: useCaseOperationProps.title,
          description: useCaseOperationProps.description,
        }),
      constructor
    );

    const operationType = OPERATION_TYPE_MAP.get(operation.type);

    applyMethodDecorador(() => operationType(''), constructor);
  };
};
