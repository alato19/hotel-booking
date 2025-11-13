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
    const checkUser = await this.userService.findByEmail(bodyParam.email);
    if (checkUser) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(bodyParam.password, 10);
    const user = await this.userService.registerUser({
      ...bodyParam,
      password: hashedPassword,
      role: 'user',
    });

    // JWT payload
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }

  public async loginUser(
    bodyParam: LoginDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userService.findByEmail(bodyParam.email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(bodyParam.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }
}
