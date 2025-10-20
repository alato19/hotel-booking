import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(body: {
        userId: number;
        roomId: number;
    }): Promise<import("./Entity/Booking.entity").BookingEntity>;
    getAllBookings(): Promise<import("./Entity/Booking.entity").BookingEntity[]>;
}
