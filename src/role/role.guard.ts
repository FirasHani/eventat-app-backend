import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; 
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      return false; 
    }
    const userRoles = user.user?.roles.map((role) => role.name || role);

    console.log('Extracted User Roles:', requiredRoles);

    return requiredRoles.every((requiredRole) =>
      userRoles.includes(requiredRole),
    );
  }
}

