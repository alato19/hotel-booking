import { RoomEntity } from './Entity/Room.entity';
import { Repository } from 'typeorm';
import { RoomDto } from './DTO/Room.dto';
export declare class RoomService {
    private roomRepository;
    constructor(roomRepository: Repository<RoomEntity>);
    create(createRoom: RoomDto): Promise<RoomEntity>;
    findAll(): Promise<any>;
    remove(id: number): Promise<any>;
    update(id: number, payload: RoomDto | Partial<RoomDto>): Promise<RoomEntity | null>;
}
