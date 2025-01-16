import { applyDecorators, Injectable } from '@nestjs/common';
import { DomainEntity } from './entity';

interface SupabaseRepositoryOptions {
  table: string;
  entity: DomainEntity<any>;
}

export function SupabaseRepositoryDecorator(
  options: SupabaseRepositoryOptions
): ClassDecorator {
  return (target: Function) => {
    target.prototype.tableName = options.table;
    target.prototype.entity = options.entity;
  };
}

export const SupabaseRepository = (options: SupabaseRepositoryOptions) =>
  applyDecorators(SupabaseRepositoryDecorator(options), Injectable);
