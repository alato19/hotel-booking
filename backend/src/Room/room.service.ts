import { Injectable } from '@nestjs/common';
import { RoomEntity } from './Entity/Room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDto } from './DTO/Room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  public async create(createRoom: RoomDto): Promise<RoomEntity> {
    const newRoom = this.roomRepository.create(createRoom);
    return await this.roomRepository.save(newRoom);
  }

  public async findAll(): Promise<any> {
    return await this.roomRepository.find();
  }

  public async remove(id: number): Promise<any> {
    return await this.roomRepository.delete(id);
  }

  async update(
    id: number,
    payload: RoomDto | Partial<RoomDto>,
  ): Promise<RoomEntity | null> {
    await this.roomRepository.update(id, payload);
    return this.roomRepository.findOne({ where: { id } });
  }
}
