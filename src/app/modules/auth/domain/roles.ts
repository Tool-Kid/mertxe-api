export enum Role {
  ANY = 'ANY',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export function isAuthorized(operationRoles: Role[], userRole: Role): boolean {
  const isAuthorized = operationRoles.includes(userRole);
  return isAuthorized;
}
