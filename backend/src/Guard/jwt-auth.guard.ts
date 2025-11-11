import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: number;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Get JWT token from cookie
    const token = request.cookies['jwt'];
    if (!token) throw new UnauthorizedException();

    try {
      // Verify token and extract user id
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload.id;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
