import { BookingService } from './booking.service';
import { CreateBookingDto } from './DTO/create-booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(body: CreateBookingDto): Promise<import("./Entity/Booking.entity").BookingEntity>;
    getAllBookings(): Promise<any>;
    getByUser(userId: number): Promise<import("./Entity/Booking.entity").BookingEntity[]>;
    deleteBooking(id: number): Promise<{
        message: string;
        bookingId: number;
    }>;
}
