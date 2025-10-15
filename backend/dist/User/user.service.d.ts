import { Repository } from 'typeorm';
import { UserEntity } from './Entity/User.entity';
import { UserDto } from './DTO/User.dto';
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    findByEmail(email: string): Promise<UserEntity | null>;
    registerUser(data: UserDto): Promise<UserEntity>;
}
