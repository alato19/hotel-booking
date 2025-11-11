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
import { UserEntity } from 'src/User/Entity/User.entity';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';
import type { Response, Request } from 'express';
import { UserService } from 'src/User/user.service';

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
    // Register user and get token
    const { user, token } = await this.authService.registerUser(bodyParam);

    // Store token in cookie
    response.cookie('jwt', token, { httpOnly: true });

    return user;
  }

  @Post('login')
  public async login(
    @Body() bodyParam: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserEntity> {
    // Login user and get token
    const { user, token } = await this.authService.loginUser(bodyParam);

    // Store token in cookie
    response.cookie('jwt', token, { httpOnly: true });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public logout(@Res({ passthrough: true }) response: Response) {
    // Delete the JWT cookie
    response.clearCookie('jwt');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  public async checkAuth(@Req() req: Request): Promise<UserEntity> {
    if (!req.user) {
      throw new HttpException(
        'User not authenticated',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userService.findById(req.user);
    return user;
  }
}
