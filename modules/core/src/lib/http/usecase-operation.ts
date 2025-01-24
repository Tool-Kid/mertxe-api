import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export interface UseCaseOperationProps {
  title: string;
  description: string;
}

export const UseCaseOperation = (props: UseCaseOperationProps) =>
  applyDecorators(
    ApiOperation({ summary: props.title, description: props.description })
  );
