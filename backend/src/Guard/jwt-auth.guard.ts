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

    console.log('---- JwtAuthGuard ----');
    console.log('Cookies:', request.cookies);

    // Get JWT token from cookie
    const token = request.cookies['jwt'];
    console.log('Token from cookie:', token);

    if (!token) {
      console.log('JwtAuthGuard → No token found');
      throw new UnauthorizedException();
    }

    try {
      // Verify token and extract user id
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Decoded JWT payload:', payload);

      request.user = payload;
      return true;
    } catch (err) {
      console.log('JwtAuthGuard → Token invalid:', err.message);
      throw new UnauthorizedException();
    }
  }
}
