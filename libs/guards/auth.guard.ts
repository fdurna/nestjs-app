import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleModel } from 'tools/models/role.model';
import { GroupModel } from 'tools/models/group.model';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly groupService: GroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!allowedRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user.user;
    const allowed = this.isAllowed(allowedRoles, user.roles);
    if (!(await allowed)) {
      throw new HttpException('Forbidden Method!', HttpStatus.FORBIDDEN);
    }
    return true;
  }

  async isAllowed(allowedRoles, userRoles: RoleModel[]) {
    const allUsersRoles = [];
    userRoles.map((data) => {
      allUsersRoles.push(data.name);
    });
    const hasRole = allUsersRoles.some((role) => allowedRoles.includes(role));
    return hasRole;
  }
}
