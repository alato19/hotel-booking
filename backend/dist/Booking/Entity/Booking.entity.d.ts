import { UserEntity } from '../../User/Entity/User.entity';
import { RoomEntity } from '../../Room/Entity/Room.entity';
export declare class BookingEntity {
    id: number;
    user: UserEntity;
    room: RoomEntity;
    createdAt: Date;
    confirmed: boolean;
}
