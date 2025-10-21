import { Repository } from 'typeorm';
import { BookingEntity } from './Entity/Booking.entity';
import { UserEntity } from 'src/User/Entity/User.entity';
import { RoomEntity } from 'src/Room/Entity/Room.entity';
export declare class BookingService {
    private bookingRepo;
    private userRepo;
    private roomRepo;
    constructor(bookingRepo: Repository<BookingEntity>, userRepo: Repository<UserEntity>, roomRepo: Repository<RoomEntity>);
    createBooking(userId: number, roomId: number): Promise<{
        message: string;
        booking: BookingEntity;
    }>;
    getAll(): Promise<BookingEntity[]>;
}
