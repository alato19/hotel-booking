import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './Entity/User.entity';
import { UserDto } from './DTO/User.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.usersRepository.findOneBy({ email });
    return result;
  }

  public async registerUser(data: UserDto): Promise<UserEntity> {
    const result = await this.usersRepository.save(data);
    return result;
  }

  public async findById(id: number): Promise<UserEntity> {
    const result = await this.usersRepository.findOne({ where: { id } });

    // If user not found, throw error
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
