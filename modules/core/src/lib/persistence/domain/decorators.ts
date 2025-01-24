import { applyDecorators, Injectable } from '@nestjs/common';
import { DomainEntity } from './entity';

interface RepositoryOptions {
  table: string;
  entity: DomainEntity<any>;
}

export function RepositoryDecorator(
  options: RepositoryOptions
): ClassDecorator {
  return (target: Function) => {
    const prefix = target.name;
    const buildKey = (prop) => `${prefix}__${prop}`;
    Reflect.defineMetadata(buildKey('tableName'), options.table, target);
    Reflect.defineMetadata(buildKey('entity'), options.entity, target);
  };
}

export const Repository = (options: RepositoryOptions) =>
  applyDecorators(RepositoryDecorator(options), Injectable);
