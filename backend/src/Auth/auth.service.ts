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
    // Check if user already exists
    const checkUser = await this.userService.findByEmail(bodyParam.email);
    if (checkUser) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(bodyParam.password, 10);
    const user = await this.userService.registerUser({
      ...bodyParam,
      password: hashedPassword,
      roles: 'user',
    });

    // Create JWT token with user id
    const token = await this.jwtService.signAsync({ id: user.id });
    return { user, token };
  }

  public async loginUser(
    bodyParam: LoginDto,
  ): Promise<{ user: UserEntity; token: string }> {
    // Find user by email
    const user = await this.userService.findByEmail(bodyParam.email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Check password
    const isMatch = await bcrypt.compare(bodyParam.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Create JWT token
    const token = await this.jwtService.signAsync({ id: user.id });
    return { user, token };
  }
}
