import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('---- RolesGuard ----');
    console.log('Required roles:', requiredRoles);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.jwt;
    console.log('Token in RolesGuard:', token);

    if (!token) {
      console.log('RolesGuard → Missing token');
      throw new UnauthorizedException('Missing Token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Decoded payload in RolesGuard:', payload);

      if (!requiredRoles.includes(payload.role)) {
        console.log('RolesGuard → Permission denied. User role:', payload.role);
        throw new ForbiddenException('Insufficient role privileges');
      }
      request.user = payload;
      return true;
    } catch (err) {
      console.log('RolesGuard → Token invalid:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
