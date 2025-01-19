import { Role } from '@modules/auth/domain/roles';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const controllerRoles: Role[] = Reflect.getMetadata(
      'roles',
      context.getClass()
    );

    if (this.isPublicRoute(controllerRoles)) {
      return true;
    }

    const jwtToken = this.extractJwtToken(request.headers['authorization']);
    if (!jwtToken) {
      return false;
    }

    const decoded = this.jwtService.decode(jwtToken);
    const userRole = decoded?.supabase?.role;

    return this.isAuthorized(userRole, controllerRoles);
  }

  private isPublicRoute(controllerRoles: Role[]): boolean {
    return controllerRoles.includes(Role.ANY);
  }

  private extractJwtToken(
    authorizationHeader: string | undefined
  ): string | null {
    return authorizationHeader?.replace('Bearer ', '') || null;
  }

  private isAuthorized(
    userRole: string | undefined,
    controllerRoles: Role[]
  ): boolean {
    if (!userRole) {
      return false;
    }

    const roleMappings = new Map<string, Role>([
      ['authenticated', Role.USER],
      ['supabase_admin', Role.ADMIN],
    ]);
    const role = roleMappings.get(userRole);

    if (!role) {
      return false;
    }

    return controllerRoles.includes(role);
  }
}
