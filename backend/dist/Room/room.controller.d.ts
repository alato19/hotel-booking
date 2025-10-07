import { RoomService } from './room.service';
import { RoomDto } from './DTO/Room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    createRoom(body: RoomDto): Promise<import("./Entity/Room.entity").RoomEntity>;
    deleteRoom(id: number): Promise<any>;
    updateRoom(id: number, updateRoom: RoomDto): Promise<import("./Entity/Room.entity").RoomEntity | null>;
    getAllRooms(): Promise<any>;
}
