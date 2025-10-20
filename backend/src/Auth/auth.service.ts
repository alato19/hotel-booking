import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';
import { UserEntity } from 'src/User/Entity/User.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async registerUser(
    bodyParam: RegisterDto,
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      const checkUser = await this.userService.findByEmail(bodyParam.email);
      console.log('checkUser---', checkUser);
      if (checkUser) {
        throw new HttpException('You are already registered', HttpStatus.FOUND);
      }

      const hashedPassword = await bcrypt.hash(bodyParam.password, 10);
      const user = await this.userService.registerUser({
        ...bodyParam,
        password: hashedPassword,
        roles: 'user',
      });

      const token = await this.jwtService.signAsync({ id: user.id });
      return { user, token };
    } catch (error) {
      console.log('error in registerUser method', error);
      throw new HttpException('User is not registered', HttpStatus.CONFLICT);
    }
  }

  public async loginUser(
    bodyParam: LoginDto,
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      const user = await this.userService.findByEmail(bodyParam.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isMatch = await bcrypt.compare(bodyParam.password, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.jwtService.signAsync({ id: user.id });

      return { user, token };
    } catch (error) {
      console.log('error in loginUser method', error);
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }
}
