import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';
import { UserEntity } from '../User/Entity/User.entity';
import type { Response, Request } from 'express';
import { UserService } from '../User/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(bodyParam: RegisterDto, response: Response): Promise<UserEntity>;
    login(bodyParam: LoginDto, response: Response): Promise<UserEntity>;
    logout(response: Response): {
        message: string;
    };
    checkAuth(req: Request): Promise<UserEntity>;
}
