import { UserService } from '../User/user.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';
import { UserEntity } from '../User/Entity/User.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    registerUser(bodyParam: RegisterDto): Promise<{
        user: UserEntity;
        token: string;
    }>;
    loginUser(bodyParam: LoginDto): Promise<{
        user: UserEntity;
        token: string;
    }>;
}
