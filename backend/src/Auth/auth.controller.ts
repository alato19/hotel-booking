import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';
import { UserEntity } from '../User/Entity/User.entity';
import { JwtAuthGuard } from '../Guard/jwt-auth.guard';
import type { Response, Request } from 'express';
import { UserService } from '../User/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  public async register(
    @Body() bodyParam: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserEntity> {
    const { user, token } = await this.authService.registerUser(bodyParam);
    response.cookie('jwt', token, { httpOnly: true });
    return user;
  }

  @Post('login')
  public async login(
    @Body() bodyParam: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserEntity> {
    const { user, token } = await this.authService.loginUser(bodyParam);
    response.cookie('jwt', token, { httpOnly: true });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logged out successfully' };
  }

  // ✅ Fixed checkUser endpoint
  @UseGuards(JwtAuthGuard)
  @Get('checkUser')
  public async checkAuth(@Req() req: Request): Promise<UserEntity> {
    if (!req.user) {
      throw new HttpException(
        'User not authenticated',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // ✅ req.user likely contains { id: number } from JwtStrategy
    const userId =
      typeof req.user === 'object' && 'id' in req.user
        ? req.user['id']
        : req.user;

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
