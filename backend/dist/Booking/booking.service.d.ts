import { Repository } from 'typeorm';
import { BookingEntity } from './Entity/Booking.entity';
import { RoomEntity } from 'src/Room/Entity/Room.entity';
import { CreateBookingDto } from './DTO/create-booking.dto';
export declare class BookingService {
    private readonly bookingRepository;
    private readonly roomRepository;
    constructor(bookingRepository: Repository<BookingEntity>, roomRepository: Repository<RoomEntity>);
    createBooking(body: CreateBookingDto): Promise<BookingEntity>;
    getBookingsByUser(userId: number): Promise<BookingEntity[]>;
    deleteBooking(id: number): Promise<{
        message: string;
        bookingId: number;
    }>;
}
