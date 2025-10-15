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
    try {
      const result = await this.usersRepository.findOneBy({ email });
      return result;
    } catch (error) {
      console.log('error in findByEmail method', error);
      throw new HttpException('an error happened', HttpStatus.NOT_FOUND);
    }
  }

  public async registerUser(data: UserDto): Promise<UserEntity> {
    try {
      const result = await this.usersRepository.save(data);
      return result;
    } catch (error) {
      console.log('error in registerUser method', error);
      throw new HttpException('User not registered', HttpStatus.NOT_FOUND);
    }
  }
}
