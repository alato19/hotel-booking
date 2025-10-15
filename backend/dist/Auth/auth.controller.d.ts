import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register.dto';
import { UserEntity } from 'src/User/Entity/User.entity';
import express from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(bodyParam: RegisterDto, response: express.Response): Promise<UserEntity>;
}
