import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register.dto';
import { UserEntity } from 'src/User/Entity/User.entity';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() bodyParam: RegisterDto,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<UserEntity> {
    try {
      const { user, token } = await this.authService.registerUser(bodyParam);
      response.cookie('jwt', token, { httpOnly: true });
      return user;
    } catch (error) {
      console.log('error in register Auth method', error);
      throw new HttpException('User is not registered', HttpStatus.CONFLICT);
    }
  }
}
