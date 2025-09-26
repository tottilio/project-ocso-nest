import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './../decorators/roles.decorator';
import { access } from 'fs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Reflector === Metadata
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.userRoles);
  }
  matchRoles(roles: string[], userRoles: string[]){
    let access = false;
    userRoles.forEach((userRole) => {
        if(roles.includes(userRole)) access = true
    })
    return access
  }
}
