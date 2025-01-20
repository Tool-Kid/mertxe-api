import { applyDecorators, Injectable } from '@nestjs/common';
import { DomainEntity } from '../infra/supabase/entity';

interface RepositoryOptions {
  table: string;
  entity: DomainEntity<any>;
}

export function RepositoryDecorator(
  options: RepositoryOptions
): ClassDecorator {
  return (target: Function) => {
    target.prototype.tableName = options.table;
    target.prototype.entity = options.entity;
  };
}

export const Repository = (options: RepositoryOptions) =>
  applyDecorators(RepositoryDecorator(options), Injectable);
