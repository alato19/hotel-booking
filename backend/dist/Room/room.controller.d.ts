import { RoomService } from './room.service';
import { RoomDto } from './DTO/Room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    getAllRooms(): Promise<any>;
    createRoom(body: RoomDto): Promise<import("./Entity/Room.entity").RoomEntity>;
    updateRoom(id: number, updateRoom: RoomDto): Promise<import("./Entity/Room.entity").RoomEntity | null>;
    deleteRoom(id: number): Promise<any>;
}
