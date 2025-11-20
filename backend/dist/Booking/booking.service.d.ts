import { Repository } from 'typeorm';
import { BookingEntity } from './Entity/Booking.entity';
import { RoomEntity } from '../Room/Entity/Room.entity';
import { CreateBookingDto } from './DTO/create-booking.dto';
export declare class BookingService {
    private readonly bookingRepository;
    private readonly roomRepository;
    constructor(bookingRepository: Repository<BookingEntity>, roomRepository: Repository<RoomEntity>);
    createBooking(body: CreateBookingDto): Promise<BookingEntity>;
    findAll(): Promise<BookingEntity[]>;
    getBookingsByUser(userId: number): Promise<BookingEntity[]>;
    confirmBooking(id: number): Promise<{
        message: string;
        bookingId: number;
    }>;
    deleteBooking(id: number): Promise<{
        message: string;
        bookingId: number;
    }>;
}
